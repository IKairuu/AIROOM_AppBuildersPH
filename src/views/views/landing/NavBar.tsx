import HexLogo from "@/views/widgets/common/HexLogo";
import Icon from "@/views/widgets/common/Icon";
import LaunchButton from "@/views/widgets/common/LaunchButton";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#impact", label: "Impact" },
  { href: "#benefits", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

export default function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex h-12 items-center gap-1 rounded-full border border-white/10 bg-[#080917]/75 py-2 pr-2 pl-4 shadow-lg shadow-black/40 backdrop-blur-md">
        <a href="#top" className="mr-4 flex items-center gap-2.5">
          <HexLogo className="size-[26px]" />
          <span className="text-base font-bold tracking-[0.2em] text-white">AIROOM</span>
        </a>
        <ul className="hidden items-center md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-2.5 py-1 text-sm text-[#a3a7c2] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="ml-2 md:ml-4">
          <LaunchButton variant="brand" size="compact">
            Launch
            <Icon name="arrowRight" className="size-4" />
          </LaunchButton>
        </span>
      </nav>
    </header>
  );
}
