import type { Metadata } from "next";
import SettingsPage from "@/views/pages/host/SettingsPage";

export const metadata: Metadata = {
  title: "Settings · AIROOM",
};

export default function Page() {
  return <SettingsPage />;
}
