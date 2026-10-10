import Icon from "@/views/widgets/common/Icon";

// Small illustrations shown inside the Features cards.

const bubble = "rounded-xl border border-[#262946] bg-[#13152b] text-[#c9cbe0]";

export function PhonesVisual() {
  // Four phones, each streaming its own answer; the last two have just started.
  const lines = [
    [64, 46],
    [60, 30],
    [56, 40],
    [62, 36],
  ];
  return (
    <div className="flex gap-3.5">
      {lines.map(([a, b], i) => (
        <div
          key={i}
          className={`relative h-[118px] w-[84px] rounded-xl border border-[#232644] bg-[#0e1126] p-2.5 ${i > 1 ? "hidden sm:block" : ""}`}
        >
          <span className="ml-auto block h-2.5 w-[38px] rounded-full bg-brand" />
          <span
            className="stream-bar mt-2.5 block h-1.5 rounded-full bg-[#2c2c53]"
            style={{ width: a, animationDelay: `${i * 0.4}s` }}
          />
          <span
            className="stream-bar mt-2 block h-1.5 rounded-full bg-[#2c2c53]"
            style={{ width: b, animationDelay: `${i * 0.4 + 0.3}s` }}
          />
        </div>
      ))}
    </div>
  );
}

export function EmergencyVisual() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#f87171]/40 bg-[#2a1828] px-4 py-3.5 shadow-[0_0_30px_-8px] shadow-[#f87171]/25">
      <Icon name="siren" className="size-5 text-[#ff6b6b]" />
      <div className="text-left">
        <p className="text-sm font-semibold tracking-[-0.02em] text-[#ff6b6b]">If someone is in danger</p>
        <p className="text-[13px] tracking-[-0.01em] text-white">Call 911 · Red Cross 143</p>
      </div>
    </div>
  );
}

export function FilesVisual() {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className={`${bubble} px-3 py-2.5 text-sm tracking-[-0.01em]`}>Bring a valid ID and proof of residence.</p>
      <span className="flex items-center gap-1.5 rounded-full border border-[#5040c8] bg-[#1c1750] px-2.5 py-1 text-xs text-[#b2a6ff]">
        <Icon name="file" className="size-3" />
        Ordinance 12 · p.3
      </span>
    </div>
  );
}

export function TutorVisual() {
  return (
    <p className={`${bubble} w-[276px] px-3.5 py-2.5 text-left text-sm leading-[1.5] tracking-[-0.01em]`}>
      <strong className="font-semibold text-[#e2e3f0]">Hint:</strong> subtract 5 from both sides first. What do you
      get?
    </p>
  );
}

export function PrivacyVisual() {
  const tile = "grid h-[70px] place-items-center rounded-xl border px-3 text-center";
  return (
    <div className="flex gap-2.5">
      {[
        ["12", "phones"],
        ["3", "asking"],
      ].map(([value, label]) => (
        <div key={label} className={`${tile} w-[60px] border-[#262946] bg-[#13152b]`}>
          <div>
            <p className="text-xl leading-6 font-semibold text-white">{value}</p>
            <p className="text-[11px] text-[#7d8199]">{label}</p>
          </div>
        </div>
      ))}
      <div className={`${tile} w-[110px] border-dashed border-[#4a3fb0]`}>
        <div>
          <Icon name="eyeOff" className="mx-auto size-4 text-lilac" />
          <p className="mt-1.5 text-[11px] text-[#7d8199]">Questions hidden</p>
        </div>
      </div>
    </div>
  );
}

export function AssistantVisual() {
  return (
    <div className="flex w-[300px] flex-col items-end gap-2.5 sm:w-[420px]">
      <p className="rounded-xl bg-brand px-3.5 py-2 text-sm tracking-[-0.02em] text-white">
        Start the session for Grade 9
      </p>
      <div className="flex w-full items-center gap-3 rounded-xl border border-[#4b40a8] bg-[#11122b] px-4 py-3 shadow-[0_0_30px_-6px] shadow-[#5b47ff]/40">
        <Icon name="play" className="size-[18px] text-emerald-400" />
        <div className="flex-1 text-left">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-white">Start session</p>
          <p className="text-[11px] text-[#7d8199]">Grade 9 Sampaguita</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-linear-to-b from-[#7462ff] to-[#5641ff] px-3 py-1.5 text-[13px] font-medium text-white">
          <Icon name="check" className="size-3.5" />
          Confirm
        </span>
      </div>
    </div>
  );
}

export function BatteryVisual() {
  return (
    <div className="flex items-center gap-2.5 text-[13px]">
      <span className="flex items-center">
        <span className="flex h-[20px] w-[46px] items-center rounded-[5px] border border-[#3a3d5c] p-[3px]">
          <span className="battery-blink block h-full w-1/4 rounded-[2px] bg-[#f2c14e]" />
        </span>
        <span className="ml-px h-2 w-[3px] rounded-r-sm bg-[#3a3d5c]" />
      </span>
      <span className="text-[#8a8fa8]">25%</span>
      <Icon name="arrowRight" className="size-3.5 text-[#8a8fa8]" />
      <span className="font-semibold tracking-[-0.02em] text-white">Gemma 3 1B</span>
    </div>
  );
}
