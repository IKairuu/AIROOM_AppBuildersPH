import type { Metadata } from "next";
import PhoneRoomPage from "@/views/pages/phone/PhoneRoomPage";

export const metadata: Metadata = {
  title: "AIROOM",
};

// What phones open from a Room's QR code.
export default function Page({ params }: PageProps<"/r/[id]">) {
  return <PhoneRoomPage roomId={params.then((p) => p.id)} />;
}
