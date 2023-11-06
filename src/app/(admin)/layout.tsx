"use client";
import Topbar from "@/components/dashboard/Topbar";
import "../globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <Topbar />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
