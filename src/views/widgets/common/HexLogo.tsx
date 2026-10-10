import Image from "next/image";
import logo from "@/assets/brand/airoom-logo.png";

type HexLogoProps = {
  // Sets the size (e.g. "size-6"), plus any shadow or animation classes.
  className?: string;
};

// The AIROOM app icon (violet hexagon, house sending Wi-Fi) from the brand PNG,
// sized by className. Bundled, so it loads offline.
export default function HexLogo({ className = "size-6" }: HexLogoProps) {
  return (
    <Image
      src={logo}
      alt=""
      aria-hidden="true"
      draggable={false}
      // Always load it: it's small and sits in view on most screens.
      loading="eager"
      sizes="128px"
      // max-w-none: some spots (like the hero orb) sit in a zero-width box, and the
      // default max-width of 100% would shrink the logo to nothing there.
      className={`max-w-none shrink-0 object-contain select-none ${className}`}
    />
  );
}
