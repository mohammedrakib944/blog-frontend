import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { BsPenFill } from "react-icons/bs";

const Topbar = () => {
  return (
    <div className="w-full border-b  bg-white z-50 sticky top-0 shadow-sm">
      <div className="homeLayout flex items-center justify-between px-3 py-2">
        <Link href="/" className="col-span-3 flex items-center gap-2">
          <Image className="w-8" src={Logo} alt="Tech" />
          <h3 className="hidden md:block">
            Techr <span className="text-xs">(Admin)</span>
          </h3>
        </Link>
        <div>
          <ul className="flex items-center gap-4 lg:gap-6 text-sm font-semibold">
            <li>
              <Link className="hover:text-primary" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/dashboard/users">
                Users
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/dashboard/category">
                Category
              </Link>
            </li>
            <li>
              <Link className="w-[90px] btn btn-sm" href="/dashboard/write">
                <BsPenFill /> Write
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
