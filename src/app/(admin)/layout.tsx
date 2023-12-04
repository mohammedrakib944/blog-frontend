"use client";
import Topbar from "@/components/dashboard/Topbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (User?.role !== "admin") {
      router.push("/");
    }
  }, [User]);

  return (
    <>
      {User ? (
        <div>
          <Topbar />
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10 gap-2">
          <Loader title="Auth checking ..." />
        </div>
      )}
    </>
  );
}
