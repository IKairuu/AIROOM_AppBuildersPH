import Icon, { type IconName } from "@/views/widgets/common/Icon";
import SectionHeading from "@/views/widgets/common/SectionHeading";

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "power",
    title: "Launch",
    body: "Open AIROOM on any laptop or desktop. It starts the AI model and the room’s own Wi-Fi.",
  },
  {
    icon: "qr",
    title: "Scan",
    body: "People scan one QR code to join the Wi-Fi and one to open the chat. Nothing to install.",
  },
  {
    icon: "chat",
    title: "Ask",
    body: "Everyone asks in English, Filipino or Taglish. Every answer comes from this computer.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 pt-24 sm:pt-[109px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <SectionHeading eyebrow="How it works" title="Up and running" lead="in" accent="three steps." />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
          {/* The rail joining the step numbers. */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-7 left-7 hidden h-px bg-linear-to-r from-[#3b3a7a] via-[#2f3a70] to-[#2b3a66] md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="grid size-14 place-items-center rounded-full border-2 border-[#3a3176] bg-ink font-landing-mono text-base font-bold text-white shadow-[0_0_34px_-4px] shadow-[#4b3bd6]/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon name={step.icon} className="mt-[26px] size-[22px] text-lilac" />
              <h3 className="mt-3 text-2xl leading-8 font-semibold tracking-[-0.04em] text-white">{step.title}</h3>
              <p className="mt-2.5 max-w-[310px] text-[15px] leading-[23px] tracking-[-0.01em] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 flex max-w-[760px] items-center gap-3 rounded-2xl border border-card-line bg-card px-5 py-3.5 text-sm leading-[22px] tracking-[-0.01em] text-[#9a9fb8]">
          <Icon name="info" className="size-4 shrink-0 text-lilac" />
          No Room set up? AIROOM works as a general assistant. Make a Room when you want it to answer from your own
          files and rules.
        </p>
      </div>
    </section>
  );
}
