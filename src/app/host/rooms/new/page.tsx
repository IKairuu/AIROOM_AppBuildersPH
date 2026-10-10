import type { Metadata } from "next";
import CreateRoomPage from "@/views/pages/host/CreateRoomPage";

export const metadata: Metadata = {
  title: "Create Room · AIROOM",
};

export default function Page() {
  return <CreateRoomPage />;
}
