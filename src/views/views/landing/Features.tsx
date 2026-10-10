import SectionHeading from "@/views/widgets/common/SectionHeading";
import ShowcaseCard from "@/views/widgets/common/ShowcaseCard";
import {
  AssistantVisual,
  BatteryVisual,
  EmergencyVisual,
  FilesVisual,
  PhonesVisual,
  PrivacyVisual,
  TutorVisual,
} from "./FeatureVisuals";

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 pt-16 sm:pt-[117px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <SectionHeading eyebrow="Features" title="Built for a whole room," lead="not" accent="just one person." />
        <div className="grid gap-4 lg:grid-cols-3">
          <ShowcaseCard visual={<PhonesVisual />} title="One AI, every phone" className="lg:col-span-2">
            Up to 4 answers stream at the same time, so the whole room gets help, not just one person.
          </ShowcaseCard>
          <ShowcaseCard visual={<EmergencyVisual />} title="Emergency help first">
            Urgent questions skip ahead and show hotlines instantly, before the AI answers.
          </ShowcaseCard>
          <ShowcaseCard visual={<FilesVisual />} title="Answers from your files">
            Add modules, forms or ordinances. Answers show the file and page.
          </ShowcaseCard>
          <ShowcaseCard visual={<TutorVisual />} title="Tutor mode">
            Hints and steps first, so students work it out instead of copying.
          </ShowcaseCard>
          <ShowcaseCard visual={<PrivacyVisual />} title="Private by design">
            The host sees counts, never questions. Chats are deleted when the session ends.
          </ShowcaseCard>
          <ShowcaseCard visual={<AssistantVisual />} title="An assistant that runs the room" className="lg:col-span-2">
            Tell it to create a Room, start the session or message every phone. It shows you a card first and acts
            only when you confirm.
          </ShowcaseCard>
          <ShowcaseCard visual={<BatteryVisual />} title="Battery-aware">
            On low battery it switches to a smaller model by itself, so the room keeps going.
          </ShowcaseCard>
        </div>
      </div>
    </section>
  );
}
