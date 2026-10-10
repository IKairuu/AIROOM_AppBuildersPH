// Server-only: the Wi-Fi name and password phones need to join the laptop's hotspot.
// Read from Windows Mobile Hotspot when possible, otherwise what the host typed in.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dataPath, readJson, writeJson } from "@/services/storage/data-store";

const run = promisify(execFile);

export type HotspotConfig = {
  ssid: string;
  password: string;
  source: "windows" | "saved";
};

// Asks Windows for the Mobile Hotspot settings (works whether the hotspot is on or off).
const WINDOWS_SCRIPT = `
[void][Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType=WindowsRuntime]
[void][Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType=WindowsRuntime]
$p = [Windows.Networking.Connectivity.NetworkInformation]::GetInternetConnectionProfile()
if (-not $p) { $p = [Windows.Networking.Connectivity.NetworkInformation]::GetConnectionProfiles() | Select-Object -First 1 }
$c = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager]::CreateFromConnectionProfile($p).GetCurrentAccessPointConfiguration()
@{ ssid = $c.Ssid; password = $c.Passphrase } | ConvertTo-Json -Compress
`;

const SAVED_FILE = () => dataPath("hotspot.json");
// The hotspot name and password rarely change, and reading them from Windows takes a few seconds.
const CACHE_MS = 5 * 60_000;
let cache: { at: number; value: HotspotConfig | null } | null = null;

async function readFromWindows(): Promise<HotspotConfig | null> {
  if (process.platform !== "win32") return null;
  try {
    const { stdout } = await run("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", WINDOWS_SCRIPT], {
      timeout: 8000,
      windowsHide: true,
    });
    const { ssid, password } = JSON.parse(stdout.trim()) as { ssid?: string; password?: string };
    return ssid ? { ssid, password: password ?? "", source: "windows" } : null;
  } catch {
    return null;
  }
}

export async function getHotspotConfig(): Promise<HotspotConfig | null> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
  const saved = await readJson<{ ssid: string; password: string }>(SAVED_FILE());
  const value = (await readFromWindows()) ?? (saved?.ssid ? { ...saved, source: "saved" as const } : null);
  cache = { at: Date.now(), value };
  return value;
}

/** Used when Windows can't report the hotspot (no network profile, or not Windows). */
export async function saveHotspotConfig(ssid: string, password: string): Promise<void> {
  await writeJson(SAVED_FILE(), { ssid, password });
  cache = null;
}

/** The standard Wi-Fi QR payload phones' cameras understand. */
export function wifiQrText({ ssid, password }: Pick<HotspotConfig, "ssid" | "password">): string {
  const esc = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
  return password ? `WIFI:T:WPA;S:${esc(ssid)};P:${esc(password)};;` : `WIFI:T:nopass;S:${esc(ssid)};;`;
}
