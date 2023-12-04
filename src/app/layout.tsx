import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "@/redux/StoreProvider";
import AuthProvider from "@/Providors/AuthProvider";
import LayoutProvider from "@/Providors/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techr",
  description: "By Mohammad Rakib",
};

interface Ichildren {
  children: React.ReactNode;
}

const RootLayout: React.FC<Ichildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="blog_dark">
      <ClerkProvider>
        <StoreProvider>
          <AuthProvider>
            <div className={inter.className}>
              <LayoutProvider>{children}</LayoutProvider>
            </div>
          </AuthProvider>
        </StoreProvider>
      </ClerkProvider>
    </html>
  );
};
export default RootLayout;
