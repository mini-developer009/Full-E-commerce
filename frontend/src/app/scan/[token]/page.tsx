// app/scan/[token]/page.tsx
import { Metadata } from "next";
import ScanPageWrapper from "./ScanPageWrapper";

export const metadata: Metadata = {
  title: "Scan QR / Barcode | MyScanner",
  description: "Scan QR codes and barcodes using your device's camera.",
  openGraph: {
    title: "Scan QR / Barcode",
    description: "Use your camera to scan barcodes and QR codes easily.",
    url: "https://yourdomain.com/scan",
    siteName: "MyScanner",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QR Scanner Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scan QR / Barcode",
    description: "Use your camera to scan barcodes and QR codes easily.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function ScanPage() {
  return <ScanPageWrapper />;
}
