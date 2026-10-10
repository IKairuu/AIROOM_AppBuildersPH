import { listBroadcasts } from "@/services/broadcast/broadcast-store";
import { listRooms } from "@/services/rooms/room-store";
import BroadcastPanel from "./BroadcastPanel";

// Reads the Rooms and past broadcasts on the server, from the laptop's data folder.
export default async function BroadcastSection() {
  const [rooms, broadcasts] = await Promise.all([listRooms(), listBroadcasts()]);
  return <BroadcastPanel rooms={rooms.map((r) => ({ id: r.id, name: r.name }))} initial={broadcasts} />;
}
