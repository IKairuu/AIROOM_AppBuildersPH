import { notFound } from "next/navigation";
import { ROOM_PRESETS } from "@/models/room/room-preset";
import { getRoom } from "@/services/rooms/room-store";
import PhoneRoomChat from "./PhoneRoomChat";

// Only what a phone needs about the Room: no file contents, no file paths.
export default async function PhoneRoom({ roomId }: { roomId: Promise<string> }) {
  const room = await getRoom(await roomId);
  if (!room) notFound();
  return (
    <PhoneRoomChat
      roomId={room.id}
      name={room.name}
      preset={room.preset}
      purpose={room.purpose || ROOM_PRESETS[room.preset].blurb}
      hasFiles={room.files.length > 0}
    />
  );
}
