import type { Metadata } from "next";
import BroadcastPage from "@/views/pages/host/BroadcastPage";

export const metadata: Metadata = {
  title: "Broadcast · AIROOM",
};

export default function Page() {
  return <BroadcastPage />;
}
