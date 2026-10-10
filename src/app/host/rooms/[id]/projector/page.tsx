import type { Metadata } from "next";
import ProjectorPage from "@/views/pages/host/ProjectorPage";

export const metadata: Metadata = {
  title: "Join the room · AIROOM",
};

export default function Page({ params }: PageProps<"/host/rooms/[id]/projector">) {
  return <ProjectorPage roomId={params.then((p) => p.id)} />;
}
