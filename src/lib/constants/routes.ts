import type { RoomPresetId } from "@/models/room/room-preset";

// The host's dashboard, opened after the launch checks pass.
export const HOST_HREF = "/host";

export const NEW_ROOM_HREF = "/host/rooms/new";

/** Opens the Create Room wizard, optionally prefilled. */
export function newRoomHref(prefill: { name?: string; preset?: RoomPresetId } = {}): string {
  const params = new URLSearchParams();
  if (prefill.preset) params.set("preset", prefill.preset);
  if (prefill.name) params.set("name", prefill.name);
  const query = params.toString();
  return query ? `${NEW_ROOM_HREF}?${query}` : NEW_ROOM_HREF;
}

export const ROOMS_HREF = "/host/rooms";

export const roomHref = (id: string) => `${ROOMS_HREF}/${encodeURIComponent(id)}`;

// A Room's full-screen join screen for the projector.
export const projectorHref = (id: string) => `${ROOMS_HREF}/${encodeURIComponent(id)}/projector`;

// The page phones open from a Room's QR code.
export const phoneRoomHref = (id: string) => `/r/${encodeURIComponent(id)}`;

export const BROADCAST_HREF = "/host/broadcast";

export const SETTINGS_HREF = "/host/settings";

export const QUEUE_HREF = "/host/queue";
