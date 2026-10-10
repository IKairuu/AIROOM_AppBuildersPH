// Server-only: reads the host's chat with the Assistant and pulls out the Room
// they asked for (name, type, rules, description) as JSON, so the app can create
// it even when the chat reply forgot the action line.
import { Ollama } from "ollama";
import { OLLAMA_HOST } from "@/lib/constants/models";
import type { ChatTurn } from "@/models/chat/chat";
import { ROOM_PRESET_IDS } from "@/models/room/room-preset";
import { getChatModel } from "@/services/ollama/chat-service";

const ollama = new Ollama({ host: OLLAMA_HOST });

const SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string" },
    preset: { type: "string", enum: [...ROOM_PRESET_IDS] },
    rules: { type: "string" },
    purpose: { type: "string" },
  },
  required: ["name", "preset", "rules", "purpose"],
};

export type RoomDraft = { name: string; preset: string; rules: string; purpose: string };

export async function extractRoomDraft(turns: ChatTurn[]): Promise<RoomDraft> {
  const transcript = turns.map((t) => `${t.role === "user" ? "Host" : "Assistant"}: ${t.content}`).join("\n");
  const res = await ollama.chat({
    model: await getChatModel(),
    format: SCHEMA,
    keep_alive: "30m",
    options: { temperature: 0, num_predict: 500 },
    messages: [
      {
        role: "system",
        content: `From this chat, return the Room the host wants to create, as JSON:
- "name": the Room's name exactly as the host gave it ("" if none).
- "preset": the best type: general, class, office, barangay or emergency.
- "rules": the rules the host gave for the Room's chatbot, as short lines starting with "- " ("" if none).
- "purpose": the description of what people should ask about ("" if none).
Use only what the host said. Don't invent a name, rules or description.`,
      },
      { role: "user", content: transcript },
    ],
  });
  const p = JSON.parse(res.message.content) as Partial<RoomDraft>;
  return {
    name: typeof p.name === "string" ? p.name : "",
    preset: typeof p.preset === "string" ? p.preset : "general",
    rules: typeof p.rules === "string" ? p.rules : "",
    purpose: typeof p.purpose === "string" ? p.purpose : "",
  };
}
