import FeatureCard from "@/views/widgets/common/FeatureCard";
import Icon, { type IconName } from "@/views/widgets/common/Icon";
import SectionHeading from "@/views/widgets/common/SectionHeading";

const stats: { value: string; accent?: string; label: string; source: string }[] = [
  { value: "~20", label: "tropical cyclones enter Philippine waters every year", source: "PAGASA" },
  { value: "10+", accent: "hrs", label: "of partial ChatGPT outage on June 10, 2025", source: "OpenAI status page" },
  { value: "₱0", label: "per question, on free and open models", source: "Gemma 3 via Ollama" },
];

const audiences: { icon: IconName; title: string; body: string; quote: string; iconClassName: string }[] = [
  {
    icon: "graduation",
    title: "Classrooms",
    body: "A study buddy that gives hints first, using the teacher’s own modules.",
    quote: "Help me solve 2x + 5 = 17",
    iconClassName: "text-teal-300",
  },
  {
    icon: "landmark",
    title: "Barangay help desks",
    body: "Answers on clearances, fees and ordinances while residents wait in line.",
    quote: "Magkano ang barangay clearance?",
    iconClassName: "text-amber-300",
  },
  {
    icon: "siren",
    title: "Evacuation centers",
    body: "Relief, safety and health information that stays up when cell sites are down.",
    quote: "Saan ang relief distribution?",
    iconClassName: "text-[#f87171]",
  },
  {
    icon: "briefcase",
    title: "Offices and trainings",
    body: "Policies and procedures answered on site, kept inside the building.",
    quote: "How do I file vacation leave?",
    iconClassName: "text-[#7aa2ff]",
  },
];

export default function Impact() {
  return (
    <section id="impact" className="scroll-mt-20 pt-24 sm:pt-[109px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <SectionHeading eyebrow="Impact" title="For the places" lead="the" accent="cloud leaves behind.">
          When a typhoon takes out the signal, the people who most need answers lose them first. AIROOM keeps the
          answers in the room.
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.source}
              className="flex flex-col rounded-[24px] border border-card-line bg-linear-to-b from-[#0e0d24] to-card px-6 pt-[22px] pb-[25px]"
            >
              <p className="text-[56px] leading-none font-semibold tracking-[-0.045em] text-[#efedff] sm:text-[64px]">
                <span className="bg-linear-to-r from-white to-[#cfc7ff] bg-clip-text text-transparent">{s.value}</span>
                {s.accent && <span className="text-gradient"> {s.accent}</span>}
              </p>
              <p className="mt-4 max-w-[270px] text-base leading-6 tracking-[-0.01em] text-[#e4e5f0]">{s.label}</p>
              <p className="mt-[11px] font-landing-mono text-[11px] leading-4 tracking-[0.2em] text-[#5f6488] uppercase">
                {s.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <FeatureCard
              key={a.title}
              icon={a.icon}
              title={a.title}
              iconClassName={a.iconClassName}
              footer={
                <p className="flex items-center gap-2 text-sm leading-5 tracking-[-0.02em] whitespace-nowrap text-white">
                  <Icon name="chat" className="size-4 shrink-0 text-lilac" />
                  {a.quote}
                </p>
              }
            >
              {a.body}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
