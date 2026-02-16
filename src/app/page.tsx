"use client";

import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("@/components/dashboard/DashboardClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-slate-950">
      <div className="animate-pulse text-slate-500 font-medium text-lg italic">
        Initializing Deriverse...
      </div>
    </div>
  ),
});

export default function Page() {
  return <DashboardClient />;
}