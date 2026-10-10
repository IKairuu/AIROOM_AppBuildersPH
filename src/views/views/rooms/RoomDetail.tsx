import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { phoneRoomHref, projectorHref, ROOMS_HREF } from "@/lib/constants/routes";
import { ROOM_PRESETS } from "@/models/room/room-preset";
import { getRoom } from "@/services/rooms/room-store";
import { getHotspotConfig, wifiQrText } from "@/services/system/hotspot-service";
import { qrSvg } from "@/services/system/qr-service";
import { findRoomAddress, roomUrl } from "@/services/system/room-network";
import Icon from "@/views/widgets/common/Icon";
import PageTitle from "@/views/widgets/common/PageTitle";
import PresetIcon, { PresetBadge } from "@/views/widgets/common/PresetIcon";
import DeleteRoomButton from "./DeleteRoomButton";
import HotspotForm from "./HotspotForm";
import { ChatQrCard, LiveSessionBadge, RoomStatusBanner, WifiQrCard } from "./RoomLiveParts";

function HowStep({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-panel/80 p-5">
      <span className="grid size-8 place-items-center rounded-full bg-indigo-500/15 font-mono text-sm text-indigo-200">{n}</span>
      <h3 className="mt-3 font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-zinc-400">{children}</p>
    </div>
  );
}

function Help({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-2xl border border-line bg-panel/80 p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
        {title}
        <Icon name="chevronDown" className="size-4 text-zinc-500 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-zinc-400">{children}</div>
    </details>
  );
}

// A Room's page: open it to phones, and show the two QR codes people scan.
// Joining is by QR code only, so no address is shown anywhere.
export default async function RoomDetail({ roomId }: { roomId: Promise<string> }) {
  const room = await getRoom(await roomId);
  if (!room) notFound();
  const preset = ROOM_PRESETS[room.preset];

  const port = ((await headers()).get("host") ?? "").split(":")[1] ?? "80";
  const [hotspot, address] = await Promise.all([getHotspotConfig(), Promise.resolve(findRoomAddress())]);
  const [wifiSvg, chatSvg] = await Promise.all([
    hotspot ? qrSvg(wifiQrText(hotspot)) : null,
    address ? qrSvg(`${roomUrl(address, port)}${phoneRoomHref(room.id)}`) : null,
  ]);
  const ssid = hotspot?.ssid ?? "the room Wi-Fi";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-8 sm:px-8">
      <div>
        <Link href={ROOMS_HREF} className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <Icon name="arrowLeft" />
          Rooms
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <PageTitle>Bring the room in.</PageTitle>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Phones join this computer’s Wi-Fi, then scan the chat QR code. No app to install and no account to create.
            </p>
          </div>
          <Link
            href={projectorHref(room.id)}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-4 py-2 text-sm text-white transition-colors hover:bg-white/8"
          >
            <Icon name="projector" />
            Projector view
          </Link>
        </div>
      </div>

      <RoomStatusBanner roomId={room.id} />

      <div className="grid gap-5 lg:grid-cols-3">
        <section aria-label="Room" className="flex flex-col gap-4 rounded-3xl border border-line bg-panel/80 p-5">
          <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Room</p>
          <div className="flex items-start gap-3">
            <PresetIcon preset={room.preset} />
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-white">{room.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{room.purpose || preset.blurb}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PresetBadge preset={room.preset} />
            <LiveSessionBadge roomId={room.id} />
          </div>

          <div className="border-t border-line pt-4">
            <p className="text-sm font-medium text-white">Files</p>
            {room.files.length === 0 ? (
              <p className="mt-1 text-xs text-zinc-500">No files. Answers come from general knowledge.</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {room.files.map((f) => (
                  <li key={f.id} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Icon name="file" className="size-3.5 shrink-0 text-indigo-300" />
                    <span className="truncate">{f.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-line pt-4">
            <p className="text-sm font-medium text-white">Rules</p>
            <p className="mt-1 line-clamp-6 text-xs leading-relaxed whitespace-pre-wrap text-zinc-400">
              {room.rules || "None. The chatbot answers from the files."}
            </p>
          </div>
          <div className="mt-auto border-t border-line pt-4">
            <DeleteRoomButton roomId={room.id} roomName={room.name} />
          </div>
        </section>

        {wifiSvg && hotspot ? (
          <WifiQrCard svg={wifiSvg} ssid={hotspot.ssid} password={hotspot.password} hotspotOn={!!address?.hotspot} />
        ) : (
          <section className="flex flex-col gap-3 rounded-3xl border border-line bg-panel/80 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Step 1 · Wi-Fi</p>
            <p className="text-sm text-zinc-400">
              Windows didn’t share the hotspot details. Type them from Settings › Mobile hotspot to make the Wi-Fi QR code.
            </p>
            <HotspotForm />
          </section>
        )}

        {chatSvg ? (
          <ChatQrCard roomId={room.id} svg={chatSvg} />
        ) : (
          <section className="flex flex-col gap-3 rounded-3xl border border-line bg-panel/80 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Step 2 · Chat</p>
            <p className="text-sm text-amber-300">This laptop isn’t on a network yet. Turn on Mobile Hotspot, then reload this page.</p>
          </section>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white">How people join</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <HowStep n={1} title="Join the Wi-Fi">
            Scan the Wi-Fi QR code with the camera, or open Wi-Fi settings and pick <b className="text-zinc-200">{ssid}</b>.
          </HowStep>
          <HowStep n={2} title="Scan the chat QR code">
            Point the camera at the chat QR code and tap the link it shows. The chat opens in the browser.
          </HowStep>
          <HowStep n={3} title="Start asking">
            Questions are anonymous and wait in a fair line, one turn per phone.
          </HowStep>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Help title="Can’t scan a QR code?">
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Open Wi-Fi settings, choose <b className="text-zinc-200">{ssid}</b> and enter the password the host shows.
            </li>
            <li>Open the Camera app, or Google Lens, and hold it over the chat QR code for a moment.</li>
            <li>On older phones, any free QR scanner app works too.</li>
            <li>Still stuck? Ask the host for help.</li>
          </ol>
        </Help>
        <Help title="Troubleshooting">
          <ul className="list-disc space-y-1 pl-5">
            <li>If the chat doesn’t load, turn off mobile data so the phone uses the room Wi-Fi.</li>
            <li>“No internet” on the Wi-Fi is normal. Tap “Stay connected” or “Use without internet”.</li>
            <li>Windows’ Mobile Hotspot allows up to 8 phones at a time.</li>
            <li>If Windows Firewall asks, allow Node on private and public networks.</li>
          </ul>
        </Help>
      </div>
    </div>
  );
}
