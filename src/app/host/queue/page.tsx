import type { Metadata } from "next";
import QueuePage from "@/views/pages/host/QueuePage";

export const metadata: Metadata = {
  title: "Queue & phones · AIROOM",
};

export default function Page() {
  return <QueuePage />;
}
