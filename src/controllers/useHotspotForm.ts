"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { saveHotspot } from "@/services/api/knowledge-service";

// Saves the hotspot's Wi-Fi details when Windows can't report them, then redraws the QR code.
export function useHotspotForm(initialSsid: string, onSaved?: () => void) {
  const router = useRouter();
  const [ssid, setSsid] = useState(initialSsid);
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await saveHotspot(ssid.trim(), password);
      setPassword("");
      router.refresh();
      onSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t save.");
    } finally {
      setSaving(false);
    }
  };

  return { ssid, setSsid, password, setPassword, saving, error, submit };
}
