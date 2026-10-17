// Feature switches. Set them in .env.local and restart the server.

// Public demo mode, for the hosted website (Vercel). The AI runs on the host
// laptop through Ollama, so the website shows a banner pointing to the local
// install, skips the launch checks and keeps data in a temporary folder.
// Set NEXT_PUBLIC_DEMO_MODE=on to turn it on.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "on";

export const REPO_URL = "https://github.com/jhonlloydval/AIROOM-AppBuildersPH";

// The Launch readiness checks (hardware, Ollama, network). On by default: Launch
// runs them before opening the dashboard. Set NEXT_PUBLIC_LAUNCH_CHECKS=off to skip
// them on a device where they can't run. Always off in demo mode.
export const LAUNCH_CHECKS_ENABLED = !DEMO_MODE && process.env.NEXT_PUBLIC_LAUNCH_CHECKS !== "off";
