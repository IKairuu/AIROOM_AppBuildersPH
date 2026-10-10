import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { phoneRoomHref, roomHref } from "@/lib/constants/routes";
import { getRoom } from "@/services/rooms/room-store";
import { getHotspotConfig, wifiQrText } from "@/services/system/hotspot-service";
import { qrSvg } from "@/services/system/qr-service";
import { findRoomAddress, roomUrl } from "@/services/system/room-network";
import AppLogo from "@/views/widgets/common/AppLogo";
import { ProjectorControls, ProjectorKicker, ProjectorPhones } from "./ProjectorLive";

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-center gap-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-indigo-500/20 text-xl font-semibold text-indigo-200">{n}</span>
      <span className="text-2xl text-zinc-100">{children}</span>
    </li>
  );
}

// The big join screen for the wall: the Room's chat QR code large, the Wi-Fi one small.
// Phones join by scanning only, so no address is shown.
export default async function ProjectorScreen({ roomId }: { roomId: Promise<string> }) {
  const room = await getRoom(await roomId);
  if (!room) notFound();

  const port = ((await headers()).get("host") ?? "").split(":")[1] ?? "80";
  const [hotspot, address] = await Promise.all([getHotspotConfig(), Promise.resolve(findRoomAddress())]);
  const [chatSvg, wifiSvg] = await Promise.all([
    address ? qrSvg(`${roomUrl(address, port)}${phoneRoomHref(room.id)}`) : null,
    hotspot ? qrSvg(wifiQrText(hotspot)) : null,
  ]);

  return (
    <div className="relative grid min-h-dvh items-center gap-12 overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,rgb(79_70_229/0.22),transparent_60%)] px-12 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-20">
      <ProjectorControls exitHref={roomHref(room.id)} />

      <div>
        <div className="flex items-center gap-3">
          <AppLogo size={44} priority />
          <span className="text-2xl font-semibold tracking-[0.25em] text-white">AIROOM</span>
        </div>
        <div className="mt-12">
          <ProjectorKicker roomId={room.id} />
        </div>
        <h1 className="mt-6 text-6xl leading-tight font-bold tracking-tight text-white xl:text-7xl">
          Ask{" "}
          <span className="bg-linear-to-r from-indigo-200 to-violet-400 bg-clip-text font-serif text-transparent italic">
            {room.name}
          </span>
        </h1>
        <ol className="mt-12 space-y-6">
          <Step n={1}>
            Join Wi-Fi <b className="text-white">{hotspot?.ssid ?? "the room Wi-Fi"}</b>
            {hotspot?.password && (
              <>
                <span className="text-zinc-500"> · password </span>
                <span className="font-mono text-white">{hotspot.password}</span>
              </>
            )}
          </Step>
          <Step n={2}>Scan the big code to open the chat</Step>
          <Step n={3}>
            Ask anything. <span className="text-zinc-500">No app, no account.</span>
          </Step>
        </ol>
      </div>

      <div className="flex flex-col items-center gap-7">
        {chatSvg ? (
          // The SVGs come from the qrcode library on this server, not from user input.
          <div
            role="img"
            aria-label="QR code that opens this Room's chat"
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-[0_0_80px_-20px] shadow-indigo-500/70 [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: chatSvg }}
          />
        ) : (
          <p className="max-w-md text-center text-xl text-amber-300">Turn on Mobile Hotspot, then reload this screen.</p>
        )}
        {wifiSvg && hotspot && (
          <div className="flex items-center gap-5">
            <div
              role="img"
              aria-label={`Wi-Fi QR code for ${hotspot.ssid}`}
              className="w-32 rounded-2xl bg-white p-2.5 [&_svg]:h-auto [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: wifiSvg }}
            />
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">Wi-Fi QR</p>
              <p className="mt-1 text-lg text-zinc-200">Scan to join {hotspot.ssid}</p>
            </div>
          </div>
        )}
        <ProjectorPhones roomId={room.id} />
      </div>
    </div>
  );
}
