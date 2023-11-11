"use client";
import Topbar from "@/components/dashboard/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
}
