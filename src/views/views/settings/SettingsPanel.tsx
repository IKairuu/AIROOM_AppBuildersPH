"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSettings } from "@/controllers/useSettings";
import { MODELS } from "@/lib/constants/models";
import { HOST_NAME_MAX, LOW_BATTERY_PERCENT } from "@/models/system/settings";
import HotspotForm from "@/views/views/rooms/HotspotForm";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";
import Icon, { type IconName } from "@/views/widgets/common/Icon";
import Spinner from "@/views/widgets/common/Spinner";

const SECTIONS = [
  ["general", "General"],
  ["model", "AI model"],
  ["wifi", "Phone Wi-Fi"],
  ["privacy", "Privacy"],
] as const;

type SectionId = (typeof SECTIONS)[number][0];

const SECTION_ICONS: Record<SectionId, IconName> = {
  general: "settings",
  model: "chip",
  wifi: "router",
  privacy: "lock",
};

// The section nearest the top of the scrolling area, to highlight it in the side nav.
function useActiveSection(ready: boolean) {
  const [active, setActive] = useState<SectionId>("general");
  useEffect(() => {
    if (!ready) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id.replace("sec-", "") as SectionId);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    for (const [id] of SECTIONS) {
      const el = document.getElementById(`sec-${id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ready]);
  return [active, setActive] as const;
}

const gb = (bytes: number) => `${(bytes / 1024 ** 3).toFixed(1)} GB`;

function Section({ id, title, index, children }: { id: SectionId; title: string; index: number; children: ReactNode }) {
  return (
    <section
      id={`sec-${id}`}
      className="rise-in scroll-mt-6 rounded-3xl border border-line bg-[#0e0e1c]/90 p-6 transition-colors hover:border-white/12"
      style={{ animationDelay: `${80 + index * 60}ms` }}
    >
      <h2 className="mb-5 flex items-center gap-2.5 font-semibold text-white">
        <span className="grid size-8 place-items-center rounded-lg border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
          <Icon name={SECTION_ICONS[id]} className="size-4" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-4 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-zinc-400">{hint}</p>
      </div>
      {children}
    </div>
  );
}

// Only the few things worth changing. Rooms have their own settings.
export default function SettingsPanel() {
  const { view, saving, notice, save, refresh } = useSettings();
  const [name, setName] = useState<string | null>(null);
  const [active, setActive] = useActiveSection(!!view);

  if (!view) {
    return (
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-5 py-12 text-sm text-zinc-400 sm:px-8">
        <Spinner /> Loading settings…
      </div>
    );
  }

  const { settings } = view;
  const nameValue = name ?? settings.hostName;
  const modelOptions = [
    {
      value: "auto",
      label: "Automatic (recommended)",
      hint: `${MODELS.main} normally. On battery below ${LOW_BATTERY_PERCENT}%, it switches to ${MODELS.lowPower} by itself so the room keeps running longer${
        view.installed.some((m) => m.tag === MODELS.lowPower) ? "." : ` (install it first: ollama pull ${MODELS.lowPower}).`
      }`,
    },
    ...view.installed.map((m) => ({
      value: m.tag,
      label: `Always ${m.label}`,
      hint: `${m.tag} · about ${gb(m.size)} of memory`,
    })),
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-5 py-8 sm:px-8">
      <div className="rise-in">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          <span className="font-serif text-accent italic">Settings</span>
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">Only the few things worth changing. Rooms have their own settings.</p>
      </div>

      {notice && (
        <p
          key={notice.text}
          role="status"
          className={`rise-in flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm ${
            notice.ok ? "border-emerald-400/25 bg-emerald-400/8 text-emerald-300" : "border-rose-400/25 bg-rose-500/8 text-rose-300"
          }`}
        >
          <Icon name={notice.ok ? "check" : "alert"} className="size-4 shrink-0" />
          {notice.text}
        </p>
      )}

      <div className="grid items-start gap-6 md:grid-cols-[170px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="rise-in -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 md:sticky md:top-6 md:mx-0 md:flex-col md:overflow-visible md:px-0"
          style={{ animationDelay: "40ms" }}
        >
          {SECTIONS.map(([id, label]) => {
            const current = active === id;
            return (
              <a
                key={id}
                href={`#sec-${id}`}
                onClick={() => setActive(id)}
                aria-current={current ? "location" : undefined}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  current
                    ? "border-accent/25 bg-accent/10 font-medium text-white"
                    : "border-transparent text-zinc-400 hover:bg-white/4 hover:text-white"
                }`}
              >
                <Icon name={SECTION_ICONS[id]} className={`size-4 ${current ? "text-accent" : ""}`} />
                {label}
              </a>
            );
          })}
        </nav>

        <div className="space-y-5">
          <Section id="general" index={0} title="General">
            <Row title="Your name" hint="Used when the Assistant greets you.">
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void save({ hostName: nameValue }, "Name saved").then(() => setName(null));
                }}
              >
                <input
                  value={nameValue}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={HOST_NAME_MAX}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="w-48 rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-400/60 focus:bg-white/5 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={name === null || saving === "hostName"}
                  className={`cursor-pointer ${buttonClasses("ghost", "sm")} h-9!`}
                >
                  Save
                </button>
              </form>
            </Row>
          </Section>

          <Section id="model" index={1} title="AI model">
            {!view.ollamaReachable && (
              <p className="mb-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
                Ollama isn’t running, so the installed models can’t be listed. Open Ollama, then refresh.
              </p>
            )}
            <div className="space-y-2" role="radiogroup" aria-label="AI model">
              {modelOptions.map((o) => {
                const checked = settings.modelMode === o.value;
                return (
                  <label
                    key={o.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors ${
                      checked
                        ? "border-indigo-400/50 bg-indigo-500/10 shadow-[0_8px_28px_-16px] shadow-indigo-500/70"
                        : "border-line hover:border-white/15 hover:bg-white/2"
                    }`}
                  >
                    <input
                      type="radio"
                      name="model"
                      value={o.value}
                      checked={checked}
                      disabled={saving === "modelMode"}
                      onChange={() => void save({ modelMode: o.value }, "Model choice saved. New answers use it.")}
                      className="mt-1 accent-indigo-400"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">{o.label}</span>
                      <span className="block text-xs text-zinc-400">{o.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
              <Icon name="chip" className="size-4 text-indigo-300" />
              Answering now with <b className="text-white">{view.activeModelLabel}</b>
              {view.batterySaver && <span className="text-amber-300">(battery saver)</span>}
              {saving === "modelMode" && <Spinner className="size-3.5" />}
            </p>
          </Section>

          <Section id="wifi" index={2} title="Phone Wi-Fi">
            <p className="text-sm text-zinc-300">
              {view.wifi ? (
                <>
                  Phones join <b className="text-white">{view.wifi.ssid}</b>
                  <span className="text-zinc-500">
                    {" "}
                    · {view.wifi.source === "windows" ? "read from Windows Mobile Hotspot" : "typed in here"}
                  </span>
                </>
              ) : (
                "Windows didn’t share the hotspot details. Type them so the Wi-Fi QR code works."
              )}
            </p>
            <p className="mt-1 mb-4 text-xs text-zinc-500">
              Used for the Wi-Fi QR code on each Room. Windows’ own settings are used when it can share them.
            </p>
            <div className="max-w-sm">
              <HotspotForm initialSsid={view.wifi?.ssid ?? ""} onSaved={() => void refresh()} />
            </div>
          </Section>

          <Section id="privacy" index={3} title="Privacy">
            <ul className="grid gap-2.5 text-sm text-zinc-300 sm:grid-cols-2">
              {[
                "Everything runs on this laptop. Nothing is sent to the internet.",
                "You never see what people ask. Phone chats aren’t saved on the laptop.",
                "Each Room’s files can only be searched by that Room’s chat.",
                "Phones need no account, name or number.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-2xl border border-line bg-white/2 p-3.5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
