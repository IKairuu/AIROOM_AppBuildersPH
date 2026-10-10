import Image from "next/image";
import logo from "@/assets/brand/airoom-logo.png";

type AppLogoProps = {
  // Rendered width and height in CSS pixels.
  size?: number;
  className?: string;
  priority?: boolean;
};

// The AIROOM app icon (violet hexagon, house sending Wi-Fi), bundled so it loads offline.
export default function AppLogo({ size = 32, className = "", priority }: AppLogoProps) {
  return (
    <Image
      src={logo}
      alt=""
      width={size}
      height={size}
      priority={priority}
      draggable={false}
      // A fixed square that never stretches: in a flex row (like next to a chat
      // bubble) it would otherwise grow to the row's height and squash.
      style={{ width: size, height: size }}
      className={`aspect-square max-w-none shrink-0 object-contain select-none ${className}`}
    />
  );
}
