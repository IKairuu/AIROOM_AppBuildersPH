import Link from "next/link";
import AppLogo from "@/views/widgets/common/AppLogo";
import StatusPill from "@/views/widgets/common/StatusPill";

type TopBarProps = {
  // Small Filipino label shown before the page title, as in the design.
  kicker?: string;
  title?: string;
};

export default function TopBar({ kicker = "Katulong", title = "Assistant" }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-line bg-background/85 px-5 py-3.5 backdrop-blur-md sm:px-8">
      <Link href="/" className="lg:hidden" aria-label="Start page">
        <AppLogo size={32} />
      </Link>
      <p className="flex items-baseline gap-3 whitespace-nowrap">
        <span className="hidden font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase sm:inline">
          {kicker}
        </span>
        <span className="font-semibold text-white">{title}</span>
      </p>

      <StatusPill />
    </header>
  );
}
