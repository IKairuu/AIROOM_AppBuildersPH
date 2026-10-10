import Link from "next/link";
import { NEW_ROOM_HREF, newRoomHref } from "@/lib/constants/routes";
import type { Room } from "@/models/room/room";
import { ROOM_PRESETS, type RoomPresetId } from "@/models/room/room-preset";
import { IDLE_SESSION } from "@/models/room/room-session";
import { allSessions } from "@/services/live/live-state";
import { listRooms } from "@/services/rooms/room-store";
import ButtonLink from "@/views/widgets/common/ButtonLink";
import Icon from "@/views/widgets/common/Icon";
import PageTitle from "@/views/widgets/common/PageTitle";
import PresetIcon from "@/views/widgets/common/PresetIcon";
import RoomCard, { type RoomCardData } from "./RoomCard";

const START_TYPES: RoomPresetId[] = ["class", "barangay", "emergency", "office"];

// Short tags from a Room's rules, shown on its card.
function ruleTags(room: Room): string[] {
  const rules = room.rules ?? "";
  return [/\btutor|hint/i.test(rules) && "Tutor", /\bquiz/i.test(rules) && "Quiz"].filter((t): t is string => !!t);
}

// Every Room saved on this laptop. Live ones come first, then newest.
export default async function RoomList() {
  const [rooms, sessions] = await Promise.all([listRooms(), allSessions()]);
  const cards: RoomCardData[] = rooms
    .map((r) => ({
      id: r.id,
      name: r.name,
      purpose: r.purpose || ROOM_PRESETS[r.preset].blurb,
      preset: r.preset,
      files: r.files.length,
      tags: ruleTags(r),
      session: (sessions.get(r.id) ?? IDLE_SESSION).state,
    }))
    .sort((a, b) => Number(b.session === "live") - Number(a.session === "live"));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <PageTitle>Your Rooms</PageTitle>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            A Room tells the assistant what it’s for: a purpose, a few rules, and the files it answers from. Phones join a
            Room by scanning its QR code while its session is live.
          </p>
        </div>
        <ButtonLink href={NEW_ROOM_HREF}>
          <Icon name="plus" />
          Create Room
        </ButtonLink>
      </div>

      <h2 className="mt-8 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">Start from a type</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {START_TYPES.map((id) => (
          <Link
            key={id}
            href={newRoomHref({ preset: id })}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-panel/80 p-4 transition-colors hover:border-indigo-400/40 hover:bg-indigo-500/5"
          >
            <PresetIcon preset={id} />
            <span>
              <span className="block text-sm font-semibold text-white">{ROOM_PRESETS[id].label}</span>
              <span className="mt-1 block text-xs text-zinc-400">{ROOM_PRESETS[id].blurb}</span>
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">All Rooms</h2>
      {cards.length === 0 ? (
        <p className="mt-3 rounded-3xl border border-dashed border-white/15 p-10 text-center text-sm text-zinc-400">
          No Rooms yet. Start from a type above, or ask the Assistant to make one for you.
        </p>
      ) : (
        <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
