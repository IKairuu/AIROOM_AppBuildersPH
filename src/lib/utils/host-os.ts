// The laptop's operating system, and the words each one uses for the same setup steps.
// Safe on both sides: the server passes process.platform, the browser its user agent.

export type HostOs = "windows" | "mac" | "linux";

export function hostOsFromPlatform(platform: string): HostOs {
  if (platform === "win32") return "windows";
  if (platform === "darwin") return "mac";
  return "linux";
}

// The launch dialog opens on the host laptop itself, so the browser's OS is the laptop's.
export function detectBrowserOs(): HostOs {
  if (typeof navigator === "undefined") return "windows";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const text = `${nav.userAgentData?.platform ?? ""} ${nav.platform ?? ""} ${nav.userAgent}`.toLowerCase();
  if (text.includes("win")) return "windows";
  if (text.includes("mac")) return "mac";
  return "linux";
}

type OsWords = {
  name: string;
  // What the OS calls sharing its Wi-Fi with phones.
  hotspot: string;
  turnOnHotspot: string;
  startOllama: string;
  installOllama: string;
  allowFirewall: (port: string) => string;
};

export const OS_WORDS: Record<HostOs, OsWords> = {
  windows: {
    name: "Windows",
    hotspot: "Mobile Hotspot",
    turnOnHotspot:
      "Turn on Mobile Hotspot in Settings › Network & internet, or run scripts\\start-hotspot.bat for a room with no internet.",
    startOllama: "Open Ollama from the Start menu, then try again.",
    installOllama: "Install Ollama from ollama.com/download/windows, open it from the Start menu, then try again.",
    allowFirewall: () => "If phones can’t connect, allow Node.js on private and public networks in Windows Firewall.",
  },
  mac: {
    name: "macOS",
    hotspot: "Internet Sharing",
    turnOnHotspot:
      "Turn on Internet Sharing to Wi-Fi in System Settings › General › Sharing (share from Ethernet or USB, to Wi-Fi).",
    startOllama: "Open Ollama from Applications, then try again.",
    installOllama: "Install Ollama from ollama.com/download/mac, move it to Applications and open it, then try again.",
    allowFirewall: () =>
      "If phones can’t connect, allow incoming connections for node in System Settings › Network › Firewall › Options.",
  },
  linux: {
    name: "Linux",
    hotspot: "Wi-Fi Hotspot",
    turnOnHotspot:
      "Turn on Wi-Fi Hotspot in Settings › Wi-Fi, or run “nmcli device wifi hotspot ssid AIROOM password <8+ characters>”.",
    startOllama: "Run “systemctl start ollama” (or “ollama serve”) in a terminal, then try again.",
    installOllama: "Install Ollama with “curl -fsSL https://ollama.com/install.sh | sh”, then try again.",
    allowFirewall: (port) => `If phones can’t connect, open the port with “sudo ufw allow ${port}/tcp”.`,
  },
};
