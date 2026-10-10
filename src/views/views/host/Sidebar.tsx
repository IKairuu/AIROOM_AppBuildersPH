import Link from "next/link";
import { BROADCAST_HREF, HOST_HREF, QUEUE_HREF, ROOMS_HREF, SETTINGS_HREF } from "@/lib/constants/routes";
import Icon, { type IconName } from "@/views/widgets/common/Icon";
import AppLogo from "@/views/widgets/common/AppLogo";

type NavItem = { icon: IconName; label: string; badge?: number; active?: boolean; href?: string };

export type HostSection = "assistant" | "rooms" | "queue" | "broadcast" | "settings";

// Each Room page has its own QR codes, so there's no separate Connect phones page.
const mainNav: (NavItem & { section: HostSection })[] = [
  { section: "assistant", icon: "sparkles", label: "Assistant", href: HOST_HREF },
  { section: "rooms", icon: "door", label: "Rooms", href: ROOMS_HREF },
];

const liveRoomNav: (NavItem & { section?: HostSection })[] = [
  { section: "queue", icon: "users", label: "Queue & phones", href: QUEUE_HREF },
  { section: "broadcast", icon: "megaphone", label: "Broadcast", href: BROADCAST_HREF },
];

function NavButton({ icon, label, badge, active, href }: NavItem) {
  const className = `relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
    active
      ? "border border-accent/25 bg-accent/10 font-medium text-white"
      : "border border-transparent text-zinc-400 hover:bg-white/4 hover:text-white"
  }`;
  const content = (
    <>
      {active && <span className="absolute top-2 bottom-2 -left-[15px] w-0.75 rounded-r bg-accent" />}
      <Icon name={icon} className={`size-4.5 ${active ? "text-accent" : ""}`} />
      {label}
      {badge !== undefined && (
        <span className="ml-auto rounded-full bg-white/8 px-2 py-0.5 text-[11px] text-zinc-400">{badge}</span>
      )}
    </>
  );
  return href ? (
    <Link href={href} aria-current={active ? "page" : undefined} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" aria-current={active ? "page" : undefined} className={className}>
      {content}
    </button>
  );
}

export default function Sidebar({ active = "assistant" }: { active?: HostSection }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-[#0c0c14] px-3.5 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-2.5 px-2">
        <AppLogo size={34} priority className="drop-shadow-[0_4px_14px_rgb(98_78_255/0.45)]" />
        <span className="text-lg font-semibold tracking-[0.2em] text-white">AIROOM</span>
      </div>

      <nav className="flex flex-1 flex-col">
        <div className="space-y-1">
          {mainNav.map(({ section, ...item }) => (
            <NavButton key={item.label} {...item} active={section === active} />
          ))}
        </div>
        <p className="mt-6 mb-2 px-3 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">Live room</p>
        <div className="space-y-1">
          {liveRoomNav.map(({ section, ...item }) => (
            <NavButton key={item.label} {...item} active={!!section && section === active} />
          ))}
        </div>
        <div className="mt-6">
          <NavButton icon="settings" label="Settings" href={SETTINGS_HREF} active={active === "settings"} />
        </div>
      </nav>

      <div className="mt-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <Icon name="arrowLeft" />
          Start page
        </Link>
      </div>
    </aside>
  );
}
