import SettingsPanel from "@/views/views/settings/SettingsPanel";
import HostShell from "./HostShell";

export default function SettingsPage() {
  return (
    <HostShell section="settings" kicker="Ayos" title="Settings">
      <SettingsPanel />
    </HostShell>
  );
}
