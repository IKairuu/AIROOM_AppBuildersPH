let counter = 0;

/**
 * A unique id for list keys and local bookkeeping in the browser.
 * Phones open AIROOM over plain http on the hotspot (not a secure context),
 * where crypto.randomUUID doesn't exist, so this never relies on it.
 */
export function clientId(): string {
  counter += 1;
  return `${Date.now().toString(36)}-${counter.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
