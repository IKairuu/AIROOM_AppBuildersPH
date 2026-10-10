// The live strip in the host's top bar: read from the laptop, refreshed every few seconds.
export type SystemStatus = {
  // Whether the laptop can reach the internet right now (AIROOM never needs it).
  internet: boolean;
  // Null when the laptop has no battery (a desktop) or it can't be read.
  battery: { percent: number; charging: boolean } | null;
  model: string;
  modelLabel: string;
  // True when "Automatic" switched to the low-power model because of the battery.
  batterySaver: boolean;
  // Speed of the most recent answer from any chat, in tokens per second.
  tokensPerSecond: number | null;
};
