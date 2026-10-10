import { clientId } from "./client-id";

const KEY = "airoom-phone-id";

/**
 * This phone's anonymous id for the fair queue and the host's phone count.
 * Kept for the browser tab only; it holds no name or number.
 */
export function phoneId(): string {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return saved;
    const id = `p-${clientId()}`.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
    sessionStorage.setItem(KEY, id);
    return id;
  } catch {
    return `p-${clientId()}`.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
  }
}
