import BroadcastSection from "@/views/views/broadcast/BroadcastSection";
import HostShell from "./HostShell";

export default function BroadcastPage() {
  return (
    <HostShell section="broadcast" kicker="Ipaalam" title="Broadcast">
      <BroadcastSection />
    </HostShell>
  );
}
