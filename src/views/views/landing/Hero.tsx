import ButtonLink from "@/views/widgets/common/ButtonLink";
import Icon from "@/views/widgets/common/Icon";
import LaunchButton from "@/views/widgets/common/LaunchButton";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Backdrop: a violet wash from the top, a faint grid and the glow behind the logo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgb(60_45_160/0.28),transparent_70%)]"
      />
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[1150px]" />

      <div className="relative z-10 mx-auto flex max-w-[1132px] flex-col items-center px-4 pt-[110px] text-center sm:pt-[136px]">
        <p className="fade-up mb-[22px] inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 py-1.5 pr-3.5 pl-1.5 font-landing-mono text-xs tracking-[0.1em] text-[#c3c6dc] uppercase">
          <span className="grid size-[18px] place-items-center rounded-full border border-white/10 bg-white/4">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
          </span>
          Walang signal, may sagot
        </p>
        <h1
          className="fade-up text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-[#f5f3ff] sm:text-[64px] lg:text-[80px] lg:leading-[1.04]"
          style={{ animationDelay: "80ms" }}
        >
          AI that stays on
          <br />
          when the <span className="text-gradient">internet goes down.</span>
        </h1>
        <p
          className="fade-up mt-[23px] max-w-[600px] text-lg leading-[1.55] tracking-[-0.01em] text-[#9197b5] sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          AIROOM turns one computer into a private AI for everyone in the room. People join from their phone’s
          browser. No signal, no app, no account.
        </p>
        <div className="fade-up mt-[30px] flex flex-wrap justify-center gap-3" style={{ animationDelay: "240ms" }}>
          <LaunchButton variant="brand" size="lg">
            <Icon name="power" className="size-[18px]" />
            Launch AIROOM
          </LaunchButton>
          <ButtonLink href="#how-it-works" variant="ghost" size="lg">
            How it works
          </ButtonLink>
        </div>
      </div>

      <HeroScene />
    </section>
  );
}
