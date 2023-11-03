"use client";
import Topbar from "@/components/dashboard/Topbar";
import "../globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Dashboard</title>
      </Head>
      <body className={inter.className}>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
