import type { Metadata } from "next";
import HostHomePage from "@/views/pages/host/HostHomePage";

export const metadata: Metadata = {
  title: "Assistant · AIROOM",
};

export default function Page() {
  return <HostHomePage />;
}
