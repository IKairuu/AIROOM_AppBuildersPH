import type { AssistantAction, ParsedAssistantReply } from "@/models/chat/assistant-action";
import { defaultRules, isRoomPresetId, ROOM_NAME_MAX, ROOM_PURPOSE_MAX, ROOM_RULES_MAX } from "@/models/room/room-preset";

// The model writes an action on its own line, e.g.
//   [[action:create_room {"name":"Grade 9 Science","preset":"class"}]]
const ACTION_MARKER = /\[\[action:([a-z_]+)\s*(\{[^\]]*\})?\s*\]\]/g;
// A marker still streaming in, hidden until it's complete.
const PARTIAL_MARKER = /\[\[[^\]]*$/;
// Anything else that looks like a marker (a made-up action, or a broken one) is never shown.
const LEFTOVER_MARKER = /\[\[action:[^\n]*/g;
// Lines that are only brackets or braces, like "{}" or "{[]}", left over from markers.
const STRAY_BRACKETS = /^[\s{}[\]()]+$/gm;

const cleanText = (value: unknown, max: number) =>
  typeof value === "string" && !/[<>]/.test(value) ? value.trim().slice(0, max) : "";

function readParams(json: string | undefined): Record<string, unknown> {
  if (!json) return {};
  try {
    const value: unknown = JSON.parse(json);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** A Room the host agreed on, from a marker or from the chat itself. Null without a name. */
export function roomDraftAction(
  params: Record<string, unknown>,
): Extract<AssistantAction, { type: "create_room_now" }> | null {
  const action = toAction("create_room_now", params);
  return action?.type === "create_room_now" ? action : null;
}

// Turns one marker into a known action. Unknown types and bad params are dropped.
function toAction(type: string, params: Record<string, unknown>): AssistantAction | null {
  switch (type) {
    case "create_room": {
      const raw = typeof params.name === "string" ? params.name.trim() : "";
      // Drops a placeholder the model copied from its instructions ("<Room name>").
      const name = /[<>]/.test(raw) ? "" : raw.slice(0, ROOM_NAME_MAX);
      return {
        type: "create_room",
        name: name || undefined,
        preset: isRoomPresetId(params.preset) ? params.preset : undefined,
      };
    }
    case "create_room_now": {
      const name = cleanText(params.name, ROOM_NAME_MAX);
      if (!name) return null;
      const preset = isRoomPresetId(params.preset) ? params.preset : "general";
      return {
        type: "create_room_now",
        name,
        preset,
        // Rules are required; without any, the Room gets sensible ones for its type.
        // One rule per line, even when the model wrote them on one line ("- a. - b.").
        rules: cleanText(params.rules, ROOM_RULES_MAX).replace(/\s+-\s+/g, "\n- ") || defaultRules(preset, name),
        purpose: cleanText(params.purpose, ROOM_PURPOSE_MAX),
      };
    }
    default:
      return null;
  }
}

// Words for "room" and for "make" in English and Filipino. A small model sometimes
// offers a Room card for unrelated questions, so the card also needs the host to have asked.
const ROOM_WORDS = /\b(rooms?|silid|kwarto|kuwarto)\b/i;
const CREATE_WORDS = /\b(create|make|set ?up|new|add|start|gawa|gawin|gumawa|magawa|igawa|bagong|lumikha)\b/i;

export function asksToCreateRoom(hostMessage: string): boolean {
  return ROOM_WORDS.test(hostMessage) && CREATE_WORDS.test(hostMessage);
}

type ParseOptions = {
  // The host message this reply answers.
  hostMessage?: string;
  // The reply has finished streaming.
  finished?: boolean;
  // The app is really creating a Room from this reply, so it may say so.
  creatingRoom?: boolean;
};

export function parseAssistantReply(
  content: string,
  { hostMessage = "", creatingRoom = false }: ParseOptions = {},
): ParsedAssistantReply {
  const roomRequested = asksToCreateRoom(hostMessage);
  let actions: AssistantAction[] = [];
  const parsed = content
    .replace(ACTION_MARKER, (_, type: string, json: string | undefined) => {
      const action = toAction(type, readParams(json));
      // One card per action type is enough.
      if (action && !actions.some((a) => a.type === action.type)) actions.push(action);
      return "";
    })
    .replace(LEFTOVER_MARKER, "")
    .replace(PARTIAL_MARKER, "")
    .replace(STRAY_BRACKETS, "")
    .trim();
  const text = parsed;

  // The setup card only shows for a real request to make a Room. (The Assistant
  // now creates Rooms in the chat itself, so there's no fallback card any more.)
  if (!roomRequested) actions = actions.filter((a) => a.type !== "create_room");

  // Guardrail: never show a claim that the Assistant did something in the app.
  // When it's really creating a Room, the app shows that once the Room is saved.
  const checked = removeFalseClaims(text);
  if (!checked.removed) return { text, actions };
  if (creatingRoom || actions.some((a) => a.type === "create_room_now")) return { text: checked.text, actions };
  const where = actions.some((a) => a.type === "create_room")
    ? "Use the button below to set it up."
    : "You can do it yourself from the pages in the sidebar.";
  return { text: [checked.text, `I can’t do that in the app myself. ${where}`].filter(Boolean).join("\n\n"), actions };
}

// The Assistant can't act in the app, but a small model sometimes says it did
// ("I've created the Room for you"). Such sentences are removed before showing
// the reply, and the host is told where to do it instead.
const FALSE_CLAIM =
  /\b(I|I've|I have|I've just|I just|I'll go ahead and|I went ahead and)\b[^.!?\n]*\b(created|made|set up|started|ended|sent|broadcast(?:ed)?|deleted|removed|added|uploaded|saved|changed|updated|renamed|relayed|launched|opened)\b|\b(ginawa ko|nagawa ko|gumawa ako|nilikha ko|naipadala ko|ipinadala ko|sinimulan ko|tinapos ko|binura ko)\b|^\s*(done|all set|tapos na)\b[\s!.]*$|\b(has|have) been (created|set up|made|started|ended|sent|deleted)\b|\b(was|is now) (successfully )?(created|set up|started|ended|sent|deleted)\b|\bcreated successfully\b/i;

export function removeFalseClaims(text: string): { text: string; removed: boolean } {
  let removed = false;
  const kept = text
    .split(/(?<=[.!?])\s+|\n/)
    .filter((sentence) => {
      if (FALSE_CLAIM.test(sentence)) {
        removed = true;
        return false;
      }
      return true;
    });
  return { text: kept.join(" ").trim(), removed };
}
