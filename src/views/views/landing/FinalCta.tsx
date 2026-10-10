import HexLogo from "@/views/widgets/common/HexLogo";
import Icon from "@/views/widgets/common/Icon";
import LaunchButton from "@/views/widgets/common/LaunchButton";

export default function FinalCta() {
  return (
    <section className="pt-24 sm:pt-[121px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="relative overflow-hidden rounded-[32px] border border-[#2a2560] bg-[#080917] px-6 pt-[76px] pb-[72px] text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_50%_15%,rgb(70_55_210/0.45),transparent_70%)]"
          />
          <div className="relative">
            <HexLogo className="glow-pulse mx-auto size-24 drop-shadow-[0_10px_34px_rgb(70_50_255/0.7)] sm:size-[104px]" />
            <h2 className="mt-8 text-[34px] leading-none font-semibold tracking-[-0.04em] text-white sm:text-[52px]">
              Ready when the <span className="text-gradient">room is.</span>
            </h2>
            <p className="mt-[9px] text-lg leading-[27px] tracking-[-0.01em] text-[#9197b5]">
              One computer. Every phone in the room. No internet needed.
            </p>
            <LaunchButton variant="brand" size="lg" className="mt-8 shadow-[0_14px_40px_-8px]">
              <Icon name="power" className="size-[18px]" />
              Launch AIROOM
            </LaunchButton>
          </div>
        </div>

        <footer className="flex flex-col gap-3 pt-9 pb-14 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 pl-1">
            <HexLogo className="size-5" />
            <span className="text-[13px] font-bold tracking-[0.2em] text-white">AIROOM</span>
          </span>
          <p className="text-xs text-[#6b7090]">Prototype for the AppBuildersPH Hackathon 2026 · Gemma 3 via Ollama</p>
        </footer>
      </div>
    </section>
  );
}
