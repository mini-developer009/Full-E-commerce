// app/scan/[token]/ScanPageWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const ScanPageClient = dynamic(() => import("../ScanPageClient"), { ssr: false });

export default function ScanPageWrapper() {
  return <ScanPageClient />;
}
