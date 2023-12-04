"use client";
import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import React from "react";
import { usePathname } from "next/navigation";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
      {!pathname.includes("dashboard") && <Navbar />}
      {children}
      {!pathname.includes("dashboard") && <Footer />}
    </div>
  );
};

export default LayoutProvider;
