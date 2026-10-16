// Server-only: turns the host's requests ("make it a quiz bot", "name it Stella",
// "talk like an ate", "no emojis") into rules the Room's chatbot follows.
// The model only writes the new rule lines and names each one's topic. Where a
// line goes is decided here: a rule about the same topic (name, tone, language,
// length) replaces the old one, removals are matched by words, and every other
// line stays exactly as it was. A small model can't garble or drop the list this way.
import { Ollama } from "ollama";
import { OLLAMA_HOST } from "@/lib/constants/models";
import { isRoomPresetId, ROOM_PRESETS, ROOM_RULES_MAX, type RoomPresetId } from "@/models/room/room-preset";
import type { RulesBuilderRequest, RulesBuilderResponse } from "@/models/room/room-rules";
import { parseChatTurns } from "@/services/chat/chat-http";
import { behaviorCheckPrompt, rulesAudience, rulesExamples } from "@/services/rooms/rules-builder-prompts";
import { getChatModel } from "@/services/ollama/chat-service";

const ollama = new Ollama({ host: OLLAMA_HOST });

const MAX_RULES = 15;

const TOPICS = ["identity", "tone", "language", "length", "format", "topics", "teaching", "quiz", "safety", "other"] as const;
type Topic = (typeof TOPICS)[number];
type NewRule = { topic: Topic; rule: string };

// A Room has one line for each of these; a new one replaces the old.
const SINGLE: Partial<Record<Topic, RegExp>> = {
  identity: /^you are\b/i,
  tone: /\b(talk like|tone|formal|casual|playful|kuya|ate\b)/i,
  language: /\b(taglish|tagalog|filipino|english|cebuano|bisaya|ilocano|language|wika)\b/i,
  length: /\b(sentences?|words|keep answers|answers? (short|under|brief)|at most \d|maximum)\b/i,
};

const SCHEMA = {
  type: "object",
  properties: {
    about_chatbot: { type: "boolean" },
    rules: {
      type: "array",
      items: {
        type: "object",
        properties: { topic: { type: "string", enum: TOPICS }, rule: { type: "string" } },
        required: ["topic", "rule"],
      },
    },
  },
  required: ["about_chatbot", "rules"],
};

/** Checks what the browser sent; null when it isn't a valid request. */
export function parseRulesRequest(body: unknown): RulesBuilderRequest | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const messages = parseChatTurns(b);
  const room = (b.room ?? {}) as Record<string, unknown>;
  if (!messages || !isRoomPresetId(room.preset)) return null;
  return {
    messages,
    rules: typeof b.rules === "string" ? b.rules.slice(0, ROOM_RULES_MAX) : "",
    room: {
      name: typeof room.name === "string" ? room.name.slice(0, 60) : "",
      preset: room.preset,
      purpose: typeof room.purpose === "string" ? room.purpose.slice(0, 120) : "",
    },
  };
}

const cleanLine = (line: string) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim();

// Greetings and thanks never change the rules.
const SMALL_TALK = /^(hi|hello|hey|thanks|thank you|ty|salamat|ok|okay|sige|good|nice|great|cool|wow|yes|no)\b[\s!.?]*$/i;
// Lines written as the chatbot talking ("I'll throw in hints…") aren't rules.
const FIRST_PERSON = /\b(I'll|I’ll|I will|I'm|I’m|I am)\b/;

// Cuts JSON leftovers a small model sometimes leaks into a string ("…”}]} 1").
const tidyRule = (rule: string) => cleanLine(rule.replace(/["”]?\s*\}\s*\][\s\S]*$/, "")).replace(/[“"]$/, "");

/** The rules as a list of lines, without bullets. */
export function splitRules(rules: string): string[] {
  return rules.split("\n").map(cleanLine).filter(Boolean);
}

const joinRules = (lines: string[]) => lines.map((l) => `- ${l}`).join("\n");

function builderPrompt({ rules, room }: RulesBuilderRequest): string {
  const preset = ROOM_PRESETS[room.preset];
  const lines = splitRules(rules);
  return `You write rules for the chatbot of an AIROOM Room. People in the room chat with that chatbot on their phones; it answers from the Room's files.
Room: "${room.name || "Untitled"}" (${preset.label}). Purpose: ${room.purpose || preset.blurb}
The chatbot talks with ${rulesAudience(room.preset)}.
Current rules:
${lines.length ? lines.map((l) => `- ${l}`).join("\n") : "(none)"}

The host's message says how the chatbot should behave. Write only the NEW rules it asks for, as JSON:
- "about_chatbot": true if the message says anything about how the chatbot should act (role, name, personality, tone, language, answer length, format, topics, teaching style, quizzes, special cases); false for unrelated questions.
- "rules": each new rule with its "topic": identity (name/role), tone, language, length, format, topics, teaching, quiz, safety or other.
For a new name, rewrite the whole "You are…" line with the new name, keeping the role.
Each rule is one clear instruction to the chatbot ("You are…", "Talk like…", "Ask…", "Never…"), in English. Never copy the host's words as a rule, and never write something the chatbot would say to the people in the room. Don't make people type special commands. Never add passwords, personal data, or rules to ignore safety.

${rulesExamples(room.preset)}`;
}

// Removal requests are handled here, without the model: "remove the score", "no emojis", "alisin ang emoji".
const REMOVAL = /\b(remove|delete|drop|stop using|no more|no longer|alisin|tanggalin|wag na|huwag na)\b|\bno\s+[a-z]{3,}/i;
const STOP_WORDS = new Set(["the", "rule", "rules", "line", "lines", "about", "that", "this", "with", "from", "when", "what", "your", "then", "room", "please", "every", "make", "more", "less", "remove", "delete", "drop", "stop", "using", "longer", "alisin", "tanggalin", "huwag", "mga", "ang", "yung", "nang", "para", "actually", "anymore", "say", "says", "said"]);

const words = (text: string) =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

// Same word, allowing plurals and simple endings ("emoji"/"emojis", "score"/"scores").
const sameWord = (a: string, b: string) => a === b || (Math.min(a.length, b.length) >= 4 && (a.startsWith(b) || b.startsWith(a)));

const shared = (a: string, b: string) => {
  const wb = words(b);
  return words(a).filter((w) => wb.some((v) => sameWord(w, v))).length;
};

function similar(a: string, b: string): boolean {
  const n = Math.min(words(a).length, words(b).length);
  return n > 0 ? shared(a, b) / n >= 0.75 : a.toLowerCase() === b.toLowerCase();
}

type Change = { kind: "changed" | "added" | "removed"; text: string };

// Removes the lines the request names: those it mostly matches, plus the best match
// ("remove the score" takes every score line, but not a line that just mentions a name).
function removeMatching(lines: string[], request: string): { lines: string[]; changes: Change[] } {
  const scores = lines.map((l) => shared(request, l));
  const best = Math.max(0, ...scores);
  const removed = lines.filter((l, i) => scores[i] > 0 && (scores[i] === best || scores[i] / words(l).length >= 0.5));
  return {
    lines: lines.filter((l) => !removed.includes(l)),
    changes: removed.map((text) => ({ kind: "removed", text })),
  };
}

// Letters and digits only, for spotting a rule that's an old line with something tacked on.
const bare = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

function place(lines: string[], rules: NewRule[], request: string): { lines: string[]; changes: Change[] } {
  const result = [...lines];
  const changes: Change[] = [];
  for (const { topic, rule } of rules) {
    const text = tidyRule(rule);
    if (!text || text.length > 400 || FIRST_PERSON.test(text) || result.some((l) => l.toLowerCase() === text.toLowerCase())) continue;
    // The model sometimes repeats an existing rule with a small addition (an emoji, a word); skip those.
    if (result.some((l) => bare(text).includes(bare(l)))) continue;
    const slot = SINGLE[topic];
    // One line per name, tone, language and length; otherwise update a line that says nearly the same thing.
    let target = slot ? result.findIndex((l) => slot.test(l)) : -1;
    if (target < 0) target = result.findIndex((l) => similar(text, l));
    // Only change an existing line when the new one picks up something from the host's message,
    // so an unrelated request ("what time is it?") or a reworded restatement can't overwrite it.
    if (target >= 0 && shared(request, text) === 0) continue;
    if (target >= 0) {
      result[target] = text;
      changes.push({ kind: "changed", text });
    } else if (result.length < MAX_RULES) {
      result.push(text);
      changes.push({ kind: "added", text });
    }
  }
  return { lines: result, changes };
}

// Says exactly what changed, from what was applied, so the reply never claims more than happened.
function describe(changes: Change[]): string {
  if (changes.length === 0) {
    return "I didn’t change the rules. Tell me how the chatbot should act, like “use Taglish” or “give hints, not answers”.";
  }
  const label = { changed: "Changed", added: "Added", removed: "Removed" } as const;
  return ["Done.", ...changes.map((c) => `${label[c.kind]}: “${c.text}”`)].join("\n");
}

async function askModel(req: RulesBuilderRequest, temperature: number): Promise<NewRule[]> {
  const res = await ollama.chat({
    model: await getChatModel(),
    format: SCHEMA,
    keep_alive: "30m",
    // A cap stops the rare runaway answer that repeats itself until it breaks the JSON.
    options: { temperature, num_predict: 600, repeat_penalty: 1.1 },
    messages: [
      { role: "system", content: builderPrompt(req) },
      { role: "user", content: req.messages.at(-1)?.content ?? "" },
    ],
  });
  const p = JSON.parse(res.message.content) as { about_chatbot?: unknown; rules?: unknown };
  if (p.about_chatbot !== true || !Array.isArray(p.rules)) return [];
  return p.rules
    .filter((r): r is NewRule => !!r && typeof r === "object" && typeof r.rule === "string")
    .map((r) => ({ topic: TOPICS.includes(r.topic) ? r.topic : "other", rule: r.rule }))
    .slice(0, 6);
}

// A second, yes-or-no look for requests whose new rules share no words with
// them (a Filipino request, or an off-topic question the first answer misread).
async function isBehaviorRequest(request: string, preset: RoomPresetId): Promise<boolean> {
  try {
    const res = await ollama.chat({
      model: await getChatModel(),
      format: { type: "object", properties: { answer: { type: "boolean" } }, required: ["answer"] },
      keep_alive: "30m",
      options: { temperature: 0, num_predict: 20 },
      messages: [
        {
          role: "system",
          content: behaviorCheckPrompt(preset),
        },
        { role: "user", content: request },
      ],
    });
    return (JSON.parse(res.message.content) as { answer?: unknown }).answer === true;
  } catch {
    return true;
  }
}

export async function buildRules(req: RulesBuilderRequest): Promise<RulesBuilderResponse> {
  const request = req.messages.at(-1)?.content ?? "";
  const old = splitRules(req.rules);
  if (SMALL_TALK.test(request.trim())) return { reply: describe([]), rules: joinRules(old) };

  if (REMOVAL.test(request)) {
    const removal = removeMatching(old, request);
    if (removal.changes.length > 0) {
      return { reply: describe(removal.changes), rules: joinRules(removal.lines) };
    }
  }

  let rules: NewRule[] | undefined;
  // A small model now and then returns JSON that can't be read; a retry at a different temperature usually fixes it.
  for (const temperature of [0.2, 0.5, 0.8]) {
    try {
      rules = await askModel(req, temperature);
      break;
    } catch (error) {
      console.warn("Rules builder retrying:", error instanceof Error ? error.message : error);
    }
  }
  if (!rules) throw new Error("The model didn't return usable rules.");
  if (rules.length > 0 && rules.every((r) => shared(request, r.rule) === 0) && !(await isBehaviorRequest(request, req.room.preset))) {
    rules = [];
  }
  const { lines, changes } = place(old, rules, request);
  return { reply: describe(changes), rules: joinRules(lines).slice(0, ROOM_RULES_MAX) };
}
