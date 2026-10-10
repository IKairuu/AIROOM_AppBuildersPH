import { hostOsFromPlatform, OS_WORDS } from "@/lib/utils/host-os";
import type { LaunchCheckResult } from "@/models/system/launch-check";
import { findRoomAddress, roomUrl } from "@/services/system/room-network";

const words = () => OS_WORDS[hostOsFromPlatform(process.platform)];

export function checkNetwork(port: string): LaunchCheckResult {
  const { hotspot, turnOnHotspot } = words();
  const address = findRoomAddress();
  if (!address) {
    return {
      id: "network",
      outcome: "failed",
      detail: "This laptop isn’t on any network phones can join.",
      fix: `${turnOnHotspot} Then try again.`,
    };
  }
  if (address.hotspot) {
    return {
      id: "network",
      outcome: "ready",
      detail: `${hotspot} is on. Phones open ${roomUrl(address, port)}`,
    };
  }
  return {
    id: "network",
    outcome: "warning",
    detail: `Mobile Hotspot is off. Phones on the same Wi-Fi as this laptop can open ${roomUrl(address, port)}`,
    fix: "For a room with no router, turn on Mobile Hotspot in Windows Settings.",
  };
}

// Asks the server for a page through the room address, the way a phone would.
// A server started on localhost only (without -H 0.0.0.0) fails here.
export async function checkServer(port: string): Promise<LaunchCheckResult> {
  const address = findRoomAddress();
  if (!address) {
    return {
      id: "server",
      outcome: "warning",
      detail: `Running on port ${port}, but there’s no network to share it on yet.`,
      fix: "Fix the room network below, then try again.",
    };
  }
  const url = roomUrl(address, port);
  try {
    const res = await fetch(`${url}/api/ping`, { signal: AbortSignal.timeout(2500), cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    return { id: "server", outcome: "ready", detail: `Serving the chat page at ${url}` };
  } catch {
    return {
      id: "server",
      outcome: "failed",
      detail: `The server is running on port ${port}, but not at ${url}.`,
      fix: `Start AIROOM with “npm run dev” or “npm start”, which listen on every network. ${words().allowFirewall(port)}`,
    };
  }
}
