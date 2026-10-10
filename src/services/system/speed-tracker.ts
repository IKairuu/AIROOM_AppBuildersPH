// Server-only: remembers how fast the latest answer was written, from any chat.
const g = globalThis as { __airoomSpeed?: { rate: number | null } };
const speed = (g.__airoomSpeed ??= { rate: null });

export function recordSpeed(tokensPerSecond: number | null): void {
  if (tokensPerSecond && Number.isFinite(tokensPerSecond)) speed.rate = tokensPerSecond;
}

export function latestSpeed(): number | null {
  return speed.rate;
}
