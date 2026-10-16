// Server-only: the pre-prompts the rules builder gives the model for each Room type.
// Each type says who the chatbot serves and shows example requests that fit it,
// so a General Room isn't nudged toward quizzes and a Class Room keeps its tutor examples.
import type { RoomPresetId } from "@/models/room/room-preset";

type PresetGuide = {
  // Who sets up the Room, for the yes-or-no check on the host's message.
  host: string;
  // Who chats with the Room's chatbot, used in the builder prompt.
  audience: string;
  examples: string[];
};

// Requests that fit any Room type.
const SHARED_EXAMPLES = [
  `"talk like a friendly ate" -> {"about_chatbot": true, "rules": [{"topic": "tone", "rule": "Talk like a friendly older sister (ate): warm, casual and encouraging."}]}`,
  `"make it more formal" -> {"about_chatbot": true, "rules": [{"topic": "tone", "rule": "Use a formal, respectful tone."}]}`,
  `"answers must be short" -> {"about_chatbot": true, "rules": [{"topic": "length", "rule": "Keep answers under 3 sentences."}]}`,
  `"use bullet points for steps" -> {"about_chatbot": true, "rules": [{"topic": "format", "rule": "Use bullet points when explaining steps."}]}`,
  `"add an emoji to every answer" -> {"about_chatbot": true, "rules": [{"topic": "format", "rule": "End every answer with one fitting emoji."}]}`,
  `"no emojis" -> {"about_chatbot": true, "rules": [{"topic": "format", "rule": "Never use emojis."}]}`,
  `"what time is it?" -> {"about_chatbot": false, "rules": []}`,
];

const PRESET_GUIDES: Record<RoomPresetId, PresetGuide> = {
  general: {
    host: "Someone is setting up a general-purpose chatbot that anyone in the room can ask about anything.",
    audience: "anyone in the room, asking about anything",
    examples: [
      `"be a helper for anything" -> {"about_chatbot": true, "rules": [{"topic": "identity", "rule": "You are an all-around helper for anyone in this Room. Help with any everyday question: explanations, writing, planning, ideas and how-tos."}]}`,
      `current "You are an all-around helper for anyone in this Room." + "call yourself Kai" -> {"about_chatbot": true, "rules": [{"topic": "identity", "rule": "You are Kai, an all-around helper for anyone in this Room. Introduce yourself as Kai."}]}`,
      `"always answer in Taglish" -> {"about_chatbot": true, "rules": [{"topic": "language", "rule": "Answer in Taglish (Tagalog and English mixed)."}]}`,
      `"explain things like I'm 12" -> {"about_chatbot": true, "rules": [{"topic": "tone", "rule": "Explain things simply, like to a 12-year-old, with everyday examples."}]}`,
      `"help people write letters and messages" -> {"about_chatbot": true, "rules": [{"topic": "topics", "rule": "Help people write letters, messages, resumes and posts: ask who it's for, then give a ready-to-use draft."}]}`,
      `"tulungan sila magplano ng budget" -> {"about_chatbot": true, "rules": [{"topic": "topics", "rule": "Help people plan budgets and simple money tasks step by step, using pesos."}]}`,
      `"ask a question back if it's unclear" -> {"about_chatbot": true, "rules": [{"topic": "other", "rule": "When a question is unclear, ask one short follow-up question before answering."}]}`,
      `"for medical or legal questions, tell them to see a professional" -> {"about_chatbot": true, "rules": [{"topic": "safety", "rule": "For medical, legal or money decisions, give general information only and suggest seeing a professional."}]}`,
    ],
  },
  class: {
    host: "A teacher is setting up a classroom chatbot.",
    audience: "students in a class",
    examples: [
      `"make it a quiz bot" -> {"about_chatbot": true, "rules": [{"topic": "identity", "rule": "You are a quiz bot for this Room."}, {"topic": "quiz", "rule": "Ask one question at a time, based only on the passages from the Room's files."}, {"topic": "quiz", "rule": "Wait for the answer. Say if it is correct, give the right answer with a one-line explanation, then ask the next question."}]}`,
      `current "You are a quiz bot for this Room." + "make your name Stella" -> {"about_chatbot": true, "rules": [{"topic": "identity", "rule": "You are Stella, a quiz bot for this Room. Introduce yourself as Stella."}]}`,
      `"5 questions, in Taglish" -> {"about_chatbot": true, "rules": [{"topic": "quiz", "rule": "Ask 5 questions in total, then share the score."}, {"topic": "language", "rule": "Ask and answer in Taglish (Tagalog and English mixed)."}]}`,
      `"only talk about science" -> {"about_chatbot": true, "rules": [{"topic": "topics", "rule": "Only discuss science. Politely decline other topics and steer back to science."}]}`,
      `"huwag ibigay agad ang sagot sa homework" -> {"about_chatbot": true, "rules": [{"topic": "teaching", "rule": "For homework questions, don't give the answer right away. Ask guiding questions first so the student thinks it through."}]}`,
      `"be encouraging when they get it wrong" -> {"about_chatbot": true, "rules": [{"topic": "quiz", "rule": "When an answer is wrong, encourage the student kindly before giving the right answer."}]}`,
    ],
  },
  office: {
    host: "Someone is setting up a chatbot for the people in their office.",
    audience: "employees in an office",
    examples: [
      `"answer only from our policies" -> {"about_chatbot": true, "rules": [{"topic": "topics", "rule": "Answer only from the company policies and procedures in the Room's files."}]}`,
      `"if it's not in the files, tell them to ask HR" -> {"about_chatbot": true, "rules": [{"topic": "other", "rule": "If a policy isn't in the Room's files, say so and tell the person to ask HR."}]}`,
      `"explain processes as numbered steps" -> {"about_chatbot": true, "rules": [{"topic": "format", "rule": "Explain processes as numbered steps."}]}`,
    ],
  },
  barangay: {
    host: "A barangay staff member is setting up a help desk chatbot for residents.",
    audience: "residents visiting the barangay hall",
    examples: [
      `"list the requirements for each document" -> {"about_chatbot": true, "rules": [{"topic": "topics", "rule": "For each barangay document, list the requirements, the fee and where to get it, from the Room's files."}]}`,
      `"sumagot sa Filipino, magalang" -> {"about_chatbot": true, "rules": [{"topic": "language", "rule": "Answer in Filipino, politely and simply."}]}`,
      `"tell seniors and PWDs about the priority lane" -> {"about_chatbot": true, "rules": [{"topic": "other", "rule": "When a senior citizen or PWD asks, tell them about the priority lane."}]}`,
    ],
  },
  emergency: {
    host: "A responder is setting up a safety chatbot for people at an evacuation center or during a crisis.",
    audience: "people in an evacuation center or crisis",
    examples: [
      `"only use the approved safety files" -> {"about_chatbot": true, "rules": [{"topic": "safety", "rule": "Answer only from the approved safety files in this Room."}]}`,
      `"for injuries, give 911 first" -> {"about_chatbot": true, "rules": [{"topic": "safety", "rule": "For injuries or danger, give the emergency hotlines 911 and 143 first, then the steps."}]}`,
      `"keep them calm" -> {"about_chatbot": true, "rules": [{"topic": "tone", "rule": "Stay calm and reassuring. Use short, simple sentences."}]}`,
    ],
  },
};

/** Example requests and rules for this Room type, for the builder prompt. */
export function rulesExamples(preset: RoomPresetId): string {
  return ["Examples:", ...PRESET_GUIDES[preset].examples, ...SHARED_EXAMPLES].join("\n");
}

/** Who chats with this Room type's chatbot. */
export function rulesAudience(preset: RoomPresetId): string {
  return PRESET_GUIDES[preset].audience;
}

/** The system prompt that asks whether a message is about how the chatbot should behave. */
export function behaviorCheckPrompt(preset: RoomPresetId): string {
  return `${PRESET_GUIDES[preset].host} Is their message an instruction about how the chatbot should behave (role, name, tone, language, length, format, topics, teaching style, quizzes, special cases)? Questions or chit-chat aimed at you are not. Reply as JSON {"answer": true|false}.`;
}
