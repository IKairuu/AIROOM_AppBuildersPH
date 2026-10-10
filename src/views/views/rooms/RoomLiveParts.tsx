"use client";

import { useState } from "react";
import { useQueueSnapshot, useRoomSessionControl } from "@/controllers/useQueue";
import { IDLE_SESSION, type RoomSessionState } from "@/models/room/room-session";
import Icon from "@/views/widgets/common/Icon";
import SessionButton, { SessionBadge } from "@/views/widgets/queue/SessionButton";

// This Room's live state from the shared poller.
function useRoomLive(roomId: string) {
  const { snapshot, refresh } = useQueueSnapshot();
  const status = snapshot?.rooms.find((r) => r.roomId === roomId);
  return {
    loaded: !!snapshot,
    state: (status?.session ?? IDLE_SESSION).state,
    phones: status?.phones ?? 0,
    refresh,
  };
}

const BANNER: Record<RoomSessionState, { tone: string; dot: string; title: string; text: string }> = {
  idle: {
    tone: "border-white/10 bg-white/3",
    dot: "bg-zinc-500",
    title: "Room not started",
    text: "Phones can join the Wi-Fi, but the chat opens only after you start a session.",
  },
  ended: {
    tone: "border-white/10 bg-white/3",
    dot: "bg-zinc-500",
    title: "Room ended",
    text: "Phones see a “session ended” page and their chats were cleared. Start again to reopen.",
  },
  live: {
    tone: "border-emerald-400/30 bg-emerald-400/8",
    dot: "bg-emerald-400 animate-pulse",
    title: "",
    text: "",
  },
};

// The strip at the top of the Room page: is the Room open, how many phones are in, Start or End.
export function RoomStatusBanner({ roomId }: { roomId: string }) {
  const live = useRoomLive(roomId);
  const control = useRoomSessionControl(() => void live.refresh());
  const b = BANNER[live.state];
  const title =
    live.state === "live" ? (live.phones ? `${live.phones} phone${live.phones === 1 ? "" : "s"} connected` : "Waiting for phones") : b.title;
  const text =
    live.state === "live"
      ? live.phones
        ? "People are in. Their questions go to the fair queue."
        : "The room is open. Ask people to scan the QR codes."
      : b.text;

  return (
    <div role="status" className={`flex flex-wrap items-center gap-4 rounded-2xl border px-5 py-4 ${b.tone}`}>
      <span className={`size-2.5 shrink-0 rounded-full ${b.dot}`} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white">{live.loaded ? title : "Checking the Room…"}</p>
        <p className="text-sm text-zinc-400">{live.loaded ? text : ""}</p>
        {control.error && <p className="mt-1 text-xs text-rose-300">{control.error}</p>}
      </div>
      {live.loaded && (
        <SessionButton
          state={live.state}
          busy={control.busyRoom === roomId}
          onStart={() => void control.start(roomId)}
          onEnd={() => void control.end(roomId)}
        />
      )}
    </div>
  );
}

export function LiveSessionBadge({ roomId }: { roomId: string }) {
  const live = useRoomLive(roomId);
  return live.loaded ? <SessionBadge state={live.state} /> : null;
}

const QR_BOX = "mx-auto w-full max-w-56 overflow-hidden rounded-2xl bg-white p-2.5 transition [&_svg]:h-auto [&_svg]:w-full";

// Step 1: phones join this laptop's Wi-Fi. The password stays hidden until the host shows it.
export function WifiQrCard({ svg, ssid, password, hotspotOn }: { svg: string; ssid: string; password: string; hotspotOn: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <section aria-labelledby="wifi-h" className="flex flex-col gap-4 rounded-3xl border border-line bg-panel/80 p-5">
      <p id="wifi-h" className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
        Step 1 · Wi-Fi
      </p>
      {/* The SVG comes from the qrcode library on this server, not from user input. */}
      <div className={QR_BOX} role="img" aria-label={`Wi-Fi QR code for ${ssid}`} dangerouslySetInnerHTML={{ __html: svg }} />
      <div>
        <p className="font-semibold text-white">{ssid}</p>
        <p className="mt-0.5 text-xs text-zinc-400">
          {password ? (
            <>
              WPA2 · password <span className="font-mono">{show ? password : "••••••••"}</span>
            </>
          ) : (
            "Open network, no password"
          )}
        </p>
      </div>
      {password && (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/8 hover:text-white"
        >
          <Icon name={show ? "eyeOff" : "lock"} className="size-3.5" />
          {show ? "Hide password" : "Show password"}
        </button>
      )}
      {!hotspotOn && (
        <p className="text-xs text-amber-300">Mobile Hotspot is off. Turn it on in Windows Settings so phones can join.</p>
      )}
      <p className="text-xs text-zinc-500">Phone cameras offer to join this Wi-Fi when they scan it.</p>
    </section>
  );
}

// Step 2: phones scan this to open the Room's chat. It only works while the session is live.
export function ChatQrCard({ roomId, svg }: { roomId: string; svg: string }) {
  const live = useRoomLive(roomId);
  const open = live.state === "live";
  return (
    <section aria-labelledby="chat-h" className="flex flex-col gap-4 rounded-3xl border border-line bg-panel/80 p-5">
      <p id="chat-h" className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
        Step 2 · Chat
      </p>
      <div
        className={`${QR_BOX} ${open ? "" : "opacity-35 grayscale"}`}
        role="img"
        aria-label="QR code that opens this Room's chat"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div>
        <p className="font-semibold text-white">Room chat</p>
        <p className="mt-0.5 text-xs text-zinc-400">Opens the AIROOM chat in any phone browser</p>
      </div>
      {open ? (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          Accepting phones
        </span>
      ) : (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-400">
          <Icon name="lock" className="size-3" />
          Opens when the session starts
        </span>
      )}
      <p className="text-xs text-zinc-500">Join the Wi-Fi first. The chat only works inside this room’s network.</p>
    </section>
  );
}
