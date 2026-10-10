// Feature switches. Set them in .env.local and restart the server.

// The Launch readiness checks (hardware, Ollama, network). On by default: Launch
// runs them before opening the dashboard. Set NEXT_PUBLIC_LAUNCH_CHECKS=off to skip
// them on a device where they can't run.
export const LAUNCH_CHECKS_ENABLED = process.env.NEXT_PUBLIC_LAUNCH_CHECKS !== "off";
