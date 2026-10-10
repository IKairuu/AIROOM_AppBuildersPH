"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLaunchChecks } from "@/controllers/useLaunchChecks";
import { HOST_HREF } from "@/lib/constants/routes";
import { OS_WORDS } from "@/lib/utils/host-os";
import type { LaunchCheckId, LaunchCheckStatus } from "@/models/system/launch-check";
import { useLaunchStore } from "@/state/launch-store";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";
import Icon, { type IconName } from "@/views/widgets/common/Icon";
import Spinner from "@/views/widgets/common/Spinner";

const checkIcons: Record<LaunchCheckId, IconName> = {
  model: "sparkles",
  server: "server",
  network: "router",
  memory: "memory",
  compute: "chip",
  power: "batteryCharging",
  internet: "wifiOff",
};

const statusText: Record<LaunchCheckStatus, { label: string; className: string }> = {
  waiting: { label: "Waiting", className: "text-zinc-500" },
  checking: { label: "Checking", className: "text-accent" },
  ready: { label: "Ready", className: "text-emerald-400" },
  warning: { label: "Check", className: "text-amber-300" },
  failed: { label: "Failed", className: "text-rose-400" },
};

function StatusIcon({ id, status }: { id: LaunchCheckId; status: LaunchCheckStatus }) {
  const base = "grid size-8 shrink-0 place-items-center rounded-lg border";
  switch (status) {
    case "ready":
      return (
        <span className={`${base} border-emerald-400/20 bg-emerald-400/10 text-emerald-300`}>
          <Icon name="check" className="size-4" />
        </span>
      );
    case "checking":
      return (
        <span className={`${base} border-accent/30 bg-accent/15 text-accent`}>
          <Spinner className="size-4" />
        </span>
      );
    case "warning":
      return (
        <span className={`${base} border-amber-400/25 bg-amber-400/10 text-amber-300`}>
          <Icon name="alert" className="size-4" />
        </span>
      );
    case "failed":
      return (
        <span className={`${base} border-rose-400/25 bg-rose-400/10 text-rose-300`}>
          <Icon name="x" className="size-4" />
        </span>
      );
    default:
      return (
        <span className={`${base} border-line bg-white/4 text-zinc-400`}>
          <Icon name={checkIcons[id]} className="size-4" />
        </span>
      );
  }
}

export default function LaunchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useLaunchStore((s) => s.dialogOpen);
  const closeDialog = useLaunchStore((s) => s.closeDialog);
  const markLaunched = useLaunchStore((s) => s.markLaunched);
  const { checks, hostOs, statuses, results, phase, start, reset } = useLaunchChecks();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    router.prefetch(HOST_HREF);
  }, [router]);

  // Fires for Esc as well as our own close(), so both paths reset the checks.
  const handleClose = () => {
    reset();
    closeDialog();
  };

  const openDashboard = () => {
    markLaunched();
    router.push(HOST_HREF);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby="launch-title"
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl border border-white/10 bg-[#0f1020] p-0 text-foreground shadow-2xl shadow-black/60 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-7">
        <div className="mb-6">
          <p className="mb-1.5 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
            Launching{hostOs && ` · ${OS_WORDS[hostOs].name}`}
          </p>
          <h2 id="launch-title" className="text-xl font-semibold tracking-tight text-white">
            Getting this laptop ready
          </h2>
        </div>

        <ul className="divide-y divide-line" aria-live="polite">
          {checks.map((check) => {
            const status = statuses[check.id];
            const text = statusText[status];
            const result = results[check.id];
            return (
              <li key={check.id} className="flex items-center gap-4 py-3">
                <StatusIcon id={check.id} status={status} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{check.label}</p>
                  <p className={`text-xs ${status === "failed" ? "text-rose-300/90" : "text-zinc-400"}`}>
                    {result?.detail ?? check.detail}
                  </p>
                  {result?.fix && <p className="mt-0.5 text-xs text-amber-200/80">{result.fix}</p>}
                </div>
                <span className={`font-mono text-[11px] tracking-[0.15em] uppercase ${text.className}`}>
                  {text.label}
                </span>
              </li>
            );
          })}
        </ul>


        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" onClick={handleClose} className={`cursor-pointer ${buttonClasses("quiet")}`}>
            Cancel
          </button>
          {phase === "done" ? (
            <button type="button" onClick={openDashboard} className={`cursor-pointer ${buttonClasses("primary")}`}>
              Open AIROOM
              <Icon name="arrowRight" />
            </button>
          ) : (
            <button
              type="button"
              onClick={start}
              disabled={phase === "running"}
              className={`cursor-pointer ${buttonClasses("primary")}`}
            >
              {phase === "running" ? (
                <>
                  <Spinner />
                  Checking…
                </>
              ) : (
                <>
                  <Icon name="power" />
                  {phase === "failed" ? "Try again" : "Start checks"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
