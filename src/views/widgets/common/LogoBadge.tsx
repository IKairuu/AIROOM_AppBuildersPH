import LogoMark from "./LogoMark";

type LogoBadgeProps = {
  size?: "sm" | "lg";
};

const sizes = {
  sm: { box: "size-8 rounded-lg", mark: "size-5" },
  lg: { box: "size-14 rounded-2xl", mark: "size-7" },
};

// The logo mark on a glowing tile, used inside the app (the start page uses the bare mark).
export default function LogoBadge({ size = "sm" }: LogoBadgeProps) {
  const s = sizes[size];
  return (
    <span
      className={`grid shrink-0 place-items-center border border-white/15 bg-linear-to-br from-indigo-500 to-violet-700 text-white shadow-[0_0_20px_-4px] shadow-violet-500/60 ${s.box}`}
    >
      <LogoMark className={s.mark} />
    </span>
  );
}
