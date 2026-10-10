import RoomList from "@/views/views/rooms/RoomList";
import HostShell from "./HostShell";

export default function RoomsPage() {
  return (
    <HostShell section="rooms" kicker="Mga Silid" title="Rooms">
      <RoomList />
    </HostShell>
  );
}
