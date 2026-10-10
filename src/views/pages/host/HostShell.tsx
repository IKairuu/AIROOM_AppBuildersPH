import { Suspense, type ReactNode } from "react";
import Sidebar, { type HostSection } from "@/views/views/host/Sidebar";
import TopBar from "@/views/views/host/TopBar";

type HostShellProps = {
  section: HostSection;
  kicker: string;
  title: string;
  children: ReactNode;
};

// Sidebar, top bar and a scrolling main area. Content that reads per-request
// data (the URL, the data folder) renders inside Suspense.
export default function HostShell({ section, kicker, title, children }: HostShellProps) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar active={section} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar kicker={kicker} title={title} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
