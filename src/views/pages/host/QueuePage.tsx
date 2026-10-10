import QueuePanel from "@/views/views/queue/QueuePanel";
import HostShell from "./HostShell";

export default function QueuePage() {
  return (
    <HostShell section="queue" kicker="Pila" title="Queue & phones">
      <QueuePanel />
    </HostShell>
  );
}
