import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "brand" | "session" | "ghost" | "quiet";
export type ButtonSize = "sm" | "compact" | "md" | "lg";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-zinc-950 hover:bg-accent-strong shadow-[0_0_24px_-6px] shadow-accent/60",
  brand:
    "bg-linear-to-b from-[#7462ff] to-[#5641ff] text-white hover:from-[#8170ff] hover:to-[#624eff] shadow-[0_10px_32px_-10px] shadow-brand",
  session: "bg-linear-to-b from-indigo-500 to-violet-600 text-white hover:from-indigo-400 hover:to-violet-500 shadow-[0_0_20px_-4px] shadow-indigo-500/70",
  ghost: "border border-white/15 bg-white/3 text-white hover:bg-white/8",
  quiet: "text-zinc-300 hover:text-white hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xs gap-1.5",
  compact: "h-8 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[50px] px-6 text-base gap-2.5",
};

// Shared by links and real <button>s so both look the same.
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]}`;
}

export default function ButtonLink({ href, variant = "primary", size = "md", children }: ButtonLinkProps) {
  const className = buttonClasses(variant, size);
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
