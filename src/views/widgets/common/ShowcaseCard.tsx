import type { ReactNode } from "react";

type ShowcaseCardProps = {
  visual: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
};

// A card with a small illustration well on top, then a title and a line of copy.
export default function ShowcaseCard({ visual, title, children, className = "" }: ShowcaseCardProps) {
  return (
    <div
      className={`flex flex-col rounded-[24px] border border-card-line bg-card p-[22px] transition-colors hover:border-white/12 ${className}`}
    >
      <div className="relative flex h-[150px] items-center justify-center overflow-hidden rounded-2xl border border-well-line bg-well">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_55%_70%_at_50%_100%,rgb(80_60_230/0.22),transparent_70%)]"
        />
        <div className="relative">{visual}</div>
      </div>
      <h3 className="mt-[18px] text-lg leading-7 font-semibold tracking-[-0.015em] text-white">{title}</h3>
      <p className="mt-1.5 max-w-[450px] text-sm leading-[22px] tracking-[-0.01em] text-muted">{children}</p>
    </div>
  );
}
