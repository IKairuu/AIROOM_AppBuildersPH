import type { Metadata } from "next";
import RoomsPage from "@/views/pages/host/RoomsPage";

export const metadata: Metadata = {
  title: "Rooms · AIROOM",
};

export default function Page() {
  return <RoomsPage />;
}
