import HexLogo from "@/views/widgets/common/HexLogo";
import Icon from "@/views/widgets/common/Icon";
import SectionHeading from "@/views/widgets/common/SectionHeading";

const rows = [
  { label: "Internet", cloud: "Required", airoom: "Not needed" },
  { label: "In a typhoon or brownout", cloud: "Goes down with the signal", airoom: "Keeps answering, even on laptop battery" },
  { label: "Your questions", cloud: "Sent to company servers", airoom: "Never leave the room" },
  { label: "Cost for a whole room", cloud: "Subscriptions or per-question fees", airoom: "₱0 per question" },
  { label: "Accounts", cloud: "Usually required", airoom: "None" },
  { label: "Who can use it", cloud: "One person per device", airoom: "Everyone in the room at once" },
];

const airoomCell = "bg-linear-to-r from-[#0d0e2a] to-[#11112f]";

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-20 pt-24 sm:pt-[109px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <SectionHeading eyebrow="Benefits" title="Why local beats the cloud" lead="when it" accent="matters most." />

        <div className="overflow-hidden rounded-[24px] border border-card-line bg-well">
          <div className="grid grid-cols-[1fr_1fr] text-[11px] md:grid-cols-[345px_1fr_388px]">
            <span className="hidden md:block" />
            <span className="flex h-[58px] items-center px-[22px] font-landing-mono tracking-[0.2em] text-[#6b7090] uppercase md:px-0">
              Cloud chatbot
            </span>
            <span
              className={`flex h-[58px] items-center gap-3 border-l border-card-line px-[22px] font-landing-mono font-semibold tracking-[0.25em] text-white uppercase ${airoomCell}`}
            >
              <HexLogo className="size-5" />
              Airoom
            </span>
          </div>

          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_1fr] border-t border-card-line text-sm tracking-[-0.01em] md:grid-cols-[345px_1fr_388px]"
            >
              <span className="col-span-2 px-[22px] pt-5 pb-2 text-[#c3c6d8] md:col-span-1 md:flex md:items-center md:py-[19px]">
                {row.label}
              </span>
              <span className="flex items-center gap-3 px-[22px] py-3 text-[#6b7090] md:px-0 md:py-[19px]">
                <Icon name="x" className="size-3.5 shrink-0 text-[#6b7090]" />
                {row.cloud}
              </span>
              <span
                className={`flex items-center gap-3 border-l border-card-line px-[22px] py-3 font-semibold text-white md:py-[19px] ${airoomCell}`}
              >
                <Icon name="check" className="size-4 shrink-0 text-emerald-400" />
                {row.airoom}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
