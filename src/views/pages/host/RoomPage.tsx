import RoomDetail from "@/views/views/rooms/RoomDetail";
import HostShell from "./HostShell";

export default function RoomPage({ roomId }: { roomId: Promise<string> }) {
  return (
    <HostShell section="rooms" kicker="Silid" title="Room">
      <RoomDetail roomId={roomId} />
    </HostShell>
  );
}
