// Server-only: draws QR codes as inline SVG, so nothing loads from the internet.
import QRCode from "qrcode";

export function qrSvg(text: string): Promise<string> {
  return QRCode.toString(text, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0b0b14", light: "#ffffff" } });
}
