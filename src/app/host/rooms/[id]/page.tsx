import type { Metadata } from "next";
import RoomPage from "@/views/pages/host/RoomPage";

export const metadata: Metadata = {
  title: "Room · AIROOM",
};

export default function Page({ params }: PageProps<"/host/rooms/[id]">) {
  return <RoomPage roomId={params.then((p) => p.id)} />;
}
