import CreateRoomWizard from "@/views/views/rooms/CreateRoomWizard";
import HostShell from "./HostShell";

export default function CreateRoomPage() {
  return (
    <HostShell section="rooms" kicker="Bagong Silid" title="Create Room">
      <CreateRoomWizard />
    </HostShell>
  );
}
