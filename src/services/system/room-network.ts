import os from "node:os";

export type RoomAddress = {
  ip: string;
  adapter: string;
  // True when this laptop is the hotspot phones connect to.
  hotspot: boolean;
};

// Default addresses the OS gives itself when it shares a hotspot:
// Windows Mobile Hotspot (192.168.137.x), macOS Internet Sharing, Linux NetworkManager.
// Exact matches for the last two, so a router-given 192.168.2.1xx isn't mistaken for one.
const isHotspotAddress = (ip: string) => ip.startsWith("192.168.137.") || ip === "192.168.2.1" || ip === "10.42.0.1";

// Adapters phones can never reach: VPNs, VMs, WSL, Bluetooth.
const IGNORED_ADAPTERS = /vEthernet|WSL|Hyper-V|VirtualBox|VMware|Hamachi|Tailscale|ZeroTier|docker|Bluetooth|Loopback|utun|awdl/i;

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31);
}

/**
 * Finds the address phones in the room should open. The laptop's own hotspot
 * comes first, then a Wi-Fi or Ethernet LAN (router mode). Null when there's none.
 */
export function findRoomAddress(): RoomAddress | null {
  const candidates: RoomAddress[] = [];
  for (const [adapter, addresses] of Object.entries(os.networkInterfaces())) {
    if (IGNORED_ADAPTERS.test(adapter)) continue;
    for (const addr of addresses ?? []) {
      if (addr.family !== "IPv4" || addr.internal || !isPrivateIPv4(addr.address)) continue;
      const hotspot = isHotspotAddress(addr.address);
      candidates.push({ ip: addr.address, adapter, hotspot });
    }
  }
  return candidates.find((c) => c.hotspot) ?? candidates[0] ?? null;
}

export function roomUrl(address: RoomAddress, port: string): string {
  return `http://${address.ip}${port === "80" ? "" : `:${port}`}`;
}
