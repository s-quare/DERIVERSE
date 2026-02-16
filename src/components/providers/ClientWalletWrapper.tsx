"use client";

import dynamic from "next/dynamic";
import React from "react";

const SolanaProvider = dynamic(
  () => import("./SolanaProvider"),
  { ssr: false }
);

export default function ClientWalletWrapper({ children }: { children: React.ReactNode }) {
  return <SolanaProvider>{children}</SolanaProvider>;
}