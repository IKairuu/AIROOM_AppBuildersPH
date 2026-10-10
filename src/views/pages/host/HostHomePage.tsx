import AssistantPanel from "@/views/views/host/AssistantPanel";
import ReadyToast from "@/views/views/host/ReadyToast";
import Sidebar from "@/views/views/host/Sidebar";
import TopBar from "@/views/views/host/TopBar";

export default function HostHomePage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="relative isolate flex min-h-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,rgb(79_70_229/0.12),transparent_60%)]">
          {/* Slow drifting light behind the assistant. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="aurora absolute -top-40 left-1/2 h-[480px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(98_78_255/0.22),transparent)] blur-2xl" />
            <div className="hero-grid absolute inset-0 opacity-60" />
          </div>
          <AssistantPanel />
        </main>
      </div>
      <ReadyToast />
    </div>
  );
}
