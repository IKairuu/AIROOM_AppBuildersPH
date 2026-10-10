"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCreateRoomWizard, WIZARD_STEPS, type RoomDraft } from "@/controllers/useCreateRoomWizard";
import { useFileUploads } from "@/controllers/useFileUploads";
import { useRulesBuilder } from "@/controllers/useRulesBuilder";
import { HOST_HREF } from "@/lib/constants/routes";
import {
  isRoomPresetId,
  ROOM_NAME_MAX,
  ROOM_PRESET_IDS,
  ROOM_PRESETS,
  ROOM_PURPOSE_MAX,
} from "@/models/room/room-preset";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";
import Icon from "@/views/widgets/common/Icon";
import PresetIcon from "@/views/widgets/common/PresetIcon";
import Spinner from "@/views/widgets/common/Spinner";
import AttachButton from "@/views/widgets/files/AttachButton";
import FileChips from "@/views/widgets/files/FileChips";
import FileDropTarget from "@/views/widgets/files/FileDropTarget";
import RulesStep from "./RulesStep";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:outline-none";

function Steps({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Progress">
      {WIZARD_STEPS.map((label, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li
            key={label}
            aria-current={now ? "step" : undefined}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
              now
                ? "border-indigo-400/40 bg-indigo-500/10 text-white"
                : done
                  ? "border-emerald-400/20 text-emerald-300"
                  : "border-white/10 text-zinc-500"
            }`}
          >
            <span className="grid size-4.5 place-items-center rounded-full bg-white/8 font-mono text-[10px]">
              {done ? <Icon name="check" className="size-3" /> : i + 1}
            </span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

function TypeStep({ draft, onPick }: { draft: RoomDraft; onPick: (preset: RoomDraft["preset"]) => void }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-white">What kind of Room?</h2>
      <p className="mt-1 text-sm text-zinc-400">This fills in sensible rules for you. General works without any files.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROOM_PRESET_IDS.map((id) => {
          const selected = draft.preset === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => onPick(id)}
              className={`flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                selected
                  ? "border-indigo-400/50 bg-indigo-500/10"
                  : "border-line bg-panel/80 hover:border-indigo-400/30 hover:bg-indigo-500/5"
              }`}
            >
              <PresetIcon preset={id} />
              <span>
                <span className="block text-sm font-semibold text-white">{ROOM_PRESETS[id].label}</span>
                <span className="mt-0.5 block text-xs text-zinc-400">{ROOM_PRESETS[id].blurb}</span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function NameStep({
  draft,
  nameError,
  update,
}: {
  draft: RoomDraft;
  nameError: boolean;
  update: (patch: Partial<RoomDraft>) => void;
}) {
  const preset = ROOM_PRESETS[draft.preset];
  return (
    <>
      <div className="flex items-center gap-3">
        <PresetIcon preset={draft.preset} />
        <div>
          <h2 className="text-lg font-semibold text-white">Name it and add files</h2>
          <p className="text-sm text-zinc-400">{preset.label} Room. Phones see the name and purpose when they join.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white">Room name</span>
            <input
              value={draft.name}
              onChange={(e) => update({ name: e.target.value })}
              maxLength={ROOM_NAME_MAX}
              placeholder={preset.nameHint}
              aria-invalid={nameError || undefined}
              autoComplete="off"
              className={`${inputClass} ${nameError ? "border-rose-400/60" : ""}`}
            />
            {nameError && <span className="mt-1.5 block text-xs text-rose-300">Give the Room a name.</span>}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-white">
              What should people ask here? <span className="font-normal text-zinc-500">(optional)</span>
            </span>
            <input
              value={draft.purpose}
              onChange={(e) => update({ purpose: e.target.value })}
              maxLength={ROOM_PURPOSE_MAX}
              placeholder={preset.blurb}
              className={inputClass}
            />
          </label>
        </div>
        <RoomFiles recommended={draft.preset !== "general"} />
      </div>
    </>
  );
}

// The files going into the Room: the ones added in the chat, plus any added here.
function RoomFiles({ recommended }: { recommended: boolean }) {
  const uploads = useFileUploads();
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-white">
        Files <span className="font-normal text-zinc-500">({recommended ? "recommended" : "optional"})</span>
      </p>
      <FileDropTarget onFiles={(files) => void uploads.addFiles(files)} label="Drop files to add them to this Room">
        <div className="space-y-3 rounded-2xl border border-dashed border-white/15 p-4">
          <FileChips
            files={uploads.pending}
            attempts={uploads.attempts}
            onRemove={(id) => void uploads.removeFile(id)}
            onDismiss={uploads.dismissError}
          />
          <div className="flex flex-wrap items-center gap-3">
            <AttachButton
              label="Add files"
              onFiles={(files) => void uploads.addFiles(files)}
              className="rounded-full border border-white/15 bg-white/4 px-3.5 py-2 text-xs text-white hover:bg-white/8"
            />
            <span className="text-xs text-zinc-500">or drop them here. PDF, Word, text or Markdown, up to 20 MB.</span>
          </div>
        </div>
      </FileDropTarget>
      <p className="mt-2 text-xs text-zinc-500">Only this Room’s chat can search its files.</p>
    </div>
  );
}

function ReviewStep({ draft }: { draft: RoomDraft }) {
  const preset = ROOM_PRESETS[draft.preset];
  const { pending } = useFileUploads();
  return (
    <>
      <h2 className="text-lg font-semibold text-white">Looks good?</h2>
      <p className="mt-1 text-sm text-zinc-400">This is what phones will get.</p>
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line bg-panel/80 p-4">
        <PresetIcon preset={draft.preset} />
        <div>
          <p className="font-semibold text-white">{draft.name}</p>
          <p className="text-sm text-zinc-400">{draft.purpose || preset.blurb}</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-zinc-500 uppercase">{preset.label} Room</p>
        </div>
      </div>
      <p className="mt-5 mb-2 text-sm font-medium text-white">
        {pending.length === 0 ? "No files" : `${pending.length} file${pending.length === 1 ? "" : "s"}`}
      </p>
      {pending.length === 0 ? (
        <p className="text-sm text-zinc-400">Answers will come from general knowledge. You can go back and add files.</p>
      ) : (
        <ul className="space-y-1.5">
          {pending.map((f) => (
            <li key={f.id} className="flex items-center gap-2 text-sm text-zinc-300">
              <Icon name="file" className="size-4 text-indigo-300" />
              {f.name}
              <span className="text-xs text-zinc-500">· {f.passages} passages</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 mb-2 text-sm font-medium text-white">Rules</p>
      {draft.rules ? (
        <pre className="rounded-2xl border border-line bg-white/3 p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-zinc-300">
          {draft.rules}
        </pre>
      ) : (
        <p className="text-sm text-zinc-400">No rules. The chatbot answers questions from the Room’s files.</p>
      )}
    </>
  );
}

export default function CreateRoomWizard() {
  const params = useSearchParams();
  const presetParam = params.get("preset");
  const { draft, step, nameError, creating, createError, update, next, back, create } = useCreateRoomWizard({
    preset: isRoomPresetId(presetParam) ? presetParam : undefined,
    name: params.get("name") ?? undefined,
  });
  const last = step === WIZARD_STEPS.length - 1;
  // Lives here, not in the step, so the Rules chat survives going Back and forth.
  const rulesChat = useRulesBuilder(draft, (rules) => update({ rules }));

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-5 py-8 sm:px-8">
      <div>
        <Link href={HOST_HREF} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <Icon name="arrowLeft" />
          Assistant
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Create a <span className="font-serif text-accent italic">Room</span>
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">Four quick steps. You can change anything later.</p>
      </div>

      <Steps current={step} />

      <section className="rounded-3xl border border-line bg-[#0e0e1c]/90 p-6 sm:p-7">
        {step === 0 && <TypeStep draft={draft} onPick={(preset) => update({ preset })} />}
        {step === 1 && <NameStep draft={draft} nameError={nameError} update={update} />}
        {step === 2 && <RulesStep draft={draft} update={update} {...rulesChat} />}
        {step === 3 && <ReviewStep draft={draft} />}

        {createError && (
          <p role="alert" className="mt-6 text-sm text-rose-300">
            {createError}
          </p>
        )}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className={`cursor-pointer ${buttonClasses("quiet")}`}
          >
            <Icon name="arrowLeft" />
            Back
          </button>
          <span className="text-xs text-zinc-500">
            Step {step + 1} of {WIZARD_STEPS.length}
          </span>
          {last ? (
            <button
              type="button"
              onClick={() => void create()}
              disabled={creating}
              className={`cursor-pointer ${buttonClasses("primary")}`}
            >
              {creating ? <Spinner /> : <Icon name="check" />}
              {creating ? "Creating…" : "Create Room"}
            </button>
          ) : (
            <button type="button" onClick={next} className={`cursor-pointer ${buttonClasses("primary")}`}>
              Continue
              <Icon name="arrowRight" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
