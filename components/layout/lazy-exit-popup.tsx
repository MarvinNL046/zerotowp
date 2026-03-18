"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(
  () => import("@/components/layout/exit-intent-popup"),
  { ssr: false }
);

export default function LazyExitPopup() {
  return <ExitIntentPopup />;
}
