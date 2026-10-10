// Server-only: the host's Queue & phones view. Counts and anonymous labels only.
import type { QueueSnapshot } from "@/models/queue/queue";
import { IDLE_SESSION } from "@/models/room/room-session";
import { listRooms } from "@/services/rooms/room-store";
import { queueView } from "./answer-queue";
import { allSessions, connectedPhones } from "./live-state";

export async function getQueueSnapshot(): Promise<QueueSnapshot> {
  const [rooms, sessions] = await Promise.all([listRooms(), allSessions()]);
  const view = queueView();
  const phones = connectedPhones();
  return {
    items: view.items,
    phones: phones
      .map((p) => ({ label: p.label, roomId: p.roomId, joinedAt: p.joinedAt, asking: view.askingPhones.has(`${p.roomId}:${p.phoneId}`) }))
      .sort((a, b) => a.joinedAt.localeCompare(b.joinedAt)),
    rooms: rooms.map((r) => ({
      roomId: r.id,
      name: r.name,
      session: sessions.get(r.id) ?? IDLE_SESSION,
      phones: phones.filter((p) => p.roomId === r.id).length,
    })),
    answering: view.answering,
    waiting: view.waiting,
    rush: view.rush,
    recentUrgent: view.recentUrgent,
    answeredToday: view.answeredToday,
  };
}
