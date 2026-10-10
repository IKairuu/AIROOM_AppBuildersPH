import type { Metadata, Viewport } from "next";
// Bundled font files (no CDN), used by the start page.
import "@fontsource-variable/inter-tight/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIROOM",
  description: "Offline AI for the room, served from this laptop.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
