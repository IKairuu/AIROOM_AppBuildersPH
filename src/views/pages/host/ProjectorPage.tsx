import { Suspense } from "react";
import ProjectorScreen from "@/views/views/projector/ProjectorScreen";

// Full screen, without the sidebar: it's meant for the wall.
export default function ProjectorPage({ roomId }: { roomId: Promise<string> }) {
  return (
    <Suspense>
      <ProjectorScreen roomId={roomId} />
    </Suspense>
  );
}
