// Questions about someone in danger, in English and Filipino. They skip the line,
// ignore the one-question-per-phone limit, and get a pre-written card at once.
const URGENT =
  /(nalulunod|drown|bleed|dumudugo|duguan|sunog|fire|nasusunog|heart attack|atake sa puso|can'?t breathe|hindi makahinga|di makahinga|unconscious|nahimatay|walang malay|stroke|seizure|kinukumbulsyon|snake ?bite|tuklaw|nakuryente|electrocut|suicide|magpakamatay|patayin ang sarili|poison|nalason)/i;

export function isUrgent(text: string): boolean {
  return URGENT.test(text);
}

export const SAFETY_CARD = {
  title: "If someone is in danger right now",
  lines: [
    "Call 911 (national emergency hotline) or 143 (Philippine Red Cross) if you have signal.",
    "Tell the host or the nearest responder in this room.",
    "Stay with the person and keep yourself safe.",
  ],
};
