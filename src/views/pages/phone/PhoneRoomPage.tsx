import { Suspense } from "react";
import PhoneRoom from "@/views/views/phone/PhoneRoom";

export default function PhoneRoomPage({ roomId }: { roomId: Promise<string> }) {
  return (
    <Suspense>
      <PhoneRoom roomId={roomId} />
    </Suspense>
  );
}
