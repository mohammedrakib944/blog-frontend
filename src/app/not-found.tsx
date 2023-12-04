import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-123px)] flex flex-col items-center justify-center">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" className="w-[100px]" alt="Logo" />
        <h1 className="text-5xl font-extrabold text-primary">404</h1>
      </div>
      <h2 className="text-3xl mt-5"> Page Not Found</h2>
      <p className="py-2 text-sm">Could not find requested resource</p>
      <Link href="/" className="btn btn-sm mt-5">
        <AiOutlineArrowLeft /> Home
      </Link>
    </div>
  );
}
