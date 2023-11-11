import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href="/" className="cursor-pointer">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.svg" className="w-[80px]" alt="Mohammed Rakib" />
          <h1 className="text-primary">Teachr</h1>
        </div>
      </Link>

      <SignUp afterSignUpUrl="/" />
    </div>
  );
}
