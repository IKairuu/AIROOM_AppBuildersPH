import Icon from "@/views/widgets/common/Icon";
import SectionHeading from "@/views/widgets/common/SectionHeading";

const faqs = [
  {
    q: "Do people need internet or mobile data?",
    a: "No. Phones connect to this computer’s Wi-Fi and open AIROOM in the browser. Mobile data can stay off.",
  },
  {
    q: "Can the host see my questions?",
    a: "No. Your chat stays between your phone and the AI on this computer. The host only sees how many people are in the room.",
  },
  {
    q: "Laptop or desktop?",
    a: "Either works. You need 8 GB of RAM or more and about 5 GB of free space for the models. A graphics card makes answers faster but isn’t required.",
  },
  {
    q: "How many phones can join?",
    a: "Windows Mobile Hotspot allows up to 8 phones at once. With a separate Wi-Fi router, many more can join.",
  },
  {
    q: "What happens when many people ask at once?",
    a: "Up to 4 answers stream at the same time. Other questions wait in a short line, and urgent safety questions skip ahead.",
  },
  {
    q: "What languages does it understand?",
    a: "English, Filipino and Taglish work well. Gemma 3 also understands many other languages.",
  },
  {
    q: "Is it always right?",
    a: "No. Like any AI it can make mistakes. In a Room with files, answers show the file and page so you can check them.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. AIROOM uses free, open models that run on this computer. There are no subscriptions or per-question fees.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 pt-24 sm:pt-[109px]">
      <div className="mx-auto grid max-w-[1132px] gap-6 px-4 lg:grid-cols-[1fr_625px] lg:gap-10">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions," accent="answered." />
          <p className="flex max-w-[340px] gap-3 rounded-2xl border border-[#3a3290] bg-[#110f2e] py-4 pr-14 pl-4 lg:-mt-3.5 text-sm leading-[1.6] tracking-[-0.01em] text-[#e4e5f0]">
            <Icon name="stars" className="mt-0.5 size-5 shrink-0 text-lilac" />
            Still wondering? After launch, ask the Assistant anything about AIROOM.
          </p>
        </div>
        <div className="border-t border-card-line lg:mt-0">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item group border-b border-card-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 pl-1 text-base leading-6 font-medium tracking-[-0.02em] text-white transition-colors hover:text-[#d9d4ff] [&::-webkit-details-marker]:hidden">
                {f.q}
                <Icon
                  name="plus"
                  className="size-4 shrink-0 text-[#6b7090] transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pr-10 pb-5 pl-1 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
