import { saveHotspotConfig } from "@/services/system/hotspot-service";

// Saves the hotspot's Wi-Fi name and password when Windows can't report them.
// Write-only: the password is never sent back as JSON, only drawn into the Wi-Fi QR code.
export async function PUT(req: Request) {
  const body = (await req.json().catch(() => null)) as { ssid?: unknown; password?: unknown } | null;
  const ssid = typeof body?.ssid === "string" ? body.ssid.trim().slice(0, 32) : "";
  const password = typeof body?.password === "string" ? body.password.slice(0, 63) : "";
  if (!ssid) return Response.json({ error: "Type the hotspot’s Wi-Fi name." }, { status: 400 });
  if (password && password.length < 8) {
    return Response.json({ error: "Wi-Fi passwords are at least 8 characters." }, { status: 400 });
  }
  await saveHotspotConfig(ssid, password);
  return new Response(null, { status: 204 });
}
