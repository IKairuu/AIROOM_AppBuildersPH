import HexLogo from "@/views/widgets/common/HexLogo";
import Icon from "@/views/widgets/common/Icon";

// Questions floating in from phones around the room. Positions are px from the
// computer at the centre: [left edge, vertical centre], plus where the link line starts.
const questions: { text: string; at: [number, number]; from: [number, number] }[] = [
  { text: "Paano kumuha ng barangay clearance?", at: [-554, -98], from: [-330, -80] },
  { text: "How do I file vacation leave?", at: [309, -107], from: [330, -90] },
  { text: "Help me solve 2x + 5 = 17", at: [-578, 60], from: [-380, 45] },
  { text: "Explain photosynthesis simply", at: [366, 51], from: [368, 40] },
  { text: "Saan ang relief distribution?", at: [-375, 157], from: [-235, 137] },
  { text: "What should I pack for evacuation?", at: [144, 157], from: [235, 137] },
];

const facts = ["100% on-device", "Zero cloud calls", "English · Filipino · Taglish", "Works on battery"];

function QuestionBubble({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0a0b1c]/85 py-1.5 pr-3.5 pl-1.5 text-sm tracking-[-0.01em] whitespace-nowrap text-[#e7e8f3] shadow-[0_8px_30px_-12px] shadow-black backdrop-blur-sm">
      <span className="grid size-7 place-items-center rounded-full bg-[#1d1b45] text-lilac">
        <Icon name="phone" className="size-3.5" />
      </span>
      {text}
    </span>
  );
}

export default function HeroScene() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="relative mx-auto h-[400px] max-w-[1440px] overflow-x-clip lg:h-[507px]">
        {/* Everything below is placed relative to this point: the computer. */}
        <div className="absolute top-[190px] left-1/2 size-0 lg:top-[270px]">
          <div className="absolute -top-[420px] -left-[420px] size-[840px] rounded-full bg-[radial-gradient(circle,rgb(78_58_230/0.42)_0%,rgb(50_35_160/0.18)_35%,transparent_68%)]" />
          <div className="absolute -top-[310px] -left-[310px] size-[620px] rounded-full border border-white/4" />
          <div className="absolute -top-[210px] -left-[210px] size-[420px] rounded-full border border-dashed border-lilac/15" />

          <svg
            viewBox="-720 -265 1440 560"
            className="absolute -top-[265px] -left-[720px] hidden h-[560px] w-[1440px] lg:block"
          >
            {questions.map((q) => (
              <line
                key={q.text}
                x1={q.from[0]}
                y1={q.from[1]}
                x2={0}
                y2={0}
                className="dash-flow"
                stroke="rgb(143 134 245 / 0.35)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            ))}
          </svg>

          <div className="ring-pulse absolute -top-[128px] -left-[128px] size-[256px] rounded-full border-[3px] border-[#3b2f99] bg-[radial-gradient(circle,rgb(90_70_255/0.35),rgb(40_28_140/0.25)_55%,rgb(20_14_70/0.3))] shadow-[0_0_60px_-10px] shadow-[#5b47ff]/60" />
          <div className="glow-pulse absolute -top-[80px] -left-[80px] size-[160px] rounded-full bg-[radial-gradient(circle,rgb(140_120_255/0.55),transparent_70%)]" />
          <HexLogo className="absolute -top-[57px] -left-[57px] size-[114px] drop-shadow-[0_10px_30px_rgb(70_50_255/0.6)]" />

          <span className="absolute top-[72px] left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/12 bg-[#0b0b22]/90 px-3 py-1 font-landing-mono text-xs whitespace-nowrap text-[#e7e8f3]">
            <Icon name="chip" className="size-3.5 text-lilac" />
            Gemma 3 · on this computer
          </span>

          {questions.map((q, i) => (
            <div
              key={q.text}
              className="absolute hidden -translate-y-1/2 lg:block"
              style={{ left: q.at[0], top: q.at[1] }}
            >
              <div className="float-y" style={{ animationDelay: `${i * -1.1}s` }}>
                <QuestionBubble text={q.text} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="relative mx-auto flex max-w-[340px] flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 pb-8 font-landing-mono text-[10px] tracking-[0.2em] text-[#5f6488] uppercase sm:max-w-none">
        {facts.map((fact, i) => (
          <li key={fact} className="flex items-center gap-4">
            {fact}
            {i < facts.length - 1 && <span className="size-1 rounded-full bg-lilac/70" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
