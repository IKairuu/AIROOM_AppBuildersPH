export const ROOM_PRESET_IDS = ["general", "class", "office", "barangay", "emergency"] as const;

export type RoomPresetId = (typeof ROOM_PRESET_IDS)[number];

export type RoomPreset = {
  id: RoomPresetId;
  label: string;
  blurb: string;
  // Example name shown in the empty name field.
  nameHint: string;
  // Starter requests in the Rules step, suited to this kind of Room.
  ruleStarters: string[];
};

export const ROOM_PRESETS: Record<RoomPresetId, RoomPreset> = {
  general: {
    id: "general",
    label: "General",
    blurb: "An everyday offline assistant for anyone in the room. No setup needed.",
    nameHint: "Open Room",
    ruleStarters: [
      "Be a friendly helper for anyone in the room",
      "Always answer in Taglish",
      "Keep answers short, 3 sentences max",
      "Use bullet points when explaining steps",
    ],
  },
  class: {
    id: "class",
    label: "Class",
    blurb: "Learning support grounded in your lessons, with Tutor mode.",
    nameHint: "Grade 9 Science",
    ruleStarters: [
      "Make it a quiz bot: ask one question at a time from the files",
      "Be a tutor: give hints first, not the answer",
      "Don't give homework answers right away; help them think",
      "Talk like a friendly ate to Grade 9 students",
    ],
  },
  office: {
    id: "office",
    label: "Office",
    blurb: "Internal procedures and workplace help that stays inside the office.",
    nameHint: "New hire onboarding",
    ruleStarters: [
      "Answer only from our company policies and procedures",
      "Use a formal, professional tone",
      "Explain processes as numbered steps",
      "If a policy isn't in the files, say to ask HR",
    ],
  },
  barangay: {
    id: "barangay",
    label: "Barangay Help Desk",
    blurb: "Local services, requirements and ordinances for residents.",
    nameHint: "Barangay San Roque Help Desk",
    ruleStarters: [
      "List the requirements and fees for each barangay document",
      "Answer in Filipino, polite and simple",
      "Give office hours and where to go when relevant",
      "Give senior citizens and PWDs priority lane info",
    ],
  },
  emergency: {
    id: "emergency",
    label: "Emergency",
    blurb: "Approved safety information and referral guidance during a crisis.",
    nameHint: "Evacuation center",
    ruleStarters: [
      "Answer only from the approved safety files",
      "Keep answers short and calm, in Filipino or English",
      "For injuries or danger, give 911 and 143 first",
      "Say where to get food, water and medical help",
    ],
  },
};

export function isRoomPresetId(value: unknown): value is RoomPresetId {
  return typeof value === "string" && (ROOM_PRESET_IDS as readonly string[]).includes(value);
}

export const ROOM_NAME_MAX = 60;
export const ROOM_PURPOSE_MAX = 120;
export const ROOM_RULES_MAX = 2000;

/** Rules for a Room the host didn't write any for, so its chatbot still has a clear job. */
export function defaultRules(preset: RoomPresetId, name: string): string {
  return [
    `- You are the assistant for the Room “${name}”. ${ROOM_PRESETS[preset].blurb}`,
    "- Answer from this Room's files first, and say where the answer came from.",
    "- Keep answers short, clear and friendly, in the language people write in.",
  ].join("\n");
}
