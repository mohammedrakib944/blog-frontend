"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { AiOutlineLogout, AiOutlineArrowRight } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit, FiSearch } from "react-icons/fi";
import { BsPenFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
// clerk
import { useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { User } = useSelector((state: any) => state.user);
  const { signOut } = useClerk();

  const handleSignout = () => {
    localStorage.removeItem("token");
    signOut();
    window.location.reload();
  };

  return (
    <div className="w-full border-b  bg-white z-50 sticky top-0">
      <div className="homeLayout  grid grid-cols-10 px-3 py-2">
        <Link href="/" className="col-span-3 flex items-center gap-2">
          <Image className="w-8" src={Logo} alt="Tech" />
          <h3>Techr</h3>
        </Link>

        <div className="col-span-5 pl-4 md:pl-10 flex items-center gap-5 md:gap-10">
          <Link
            href="/search"
            className="flex items-center gap-2 text-lg text-gray-500 hover:text-gray-900 tooltip tooltip-bottom"
            data-tip="Search"
          >
            <FiSearch /> <span className="text-sm">Search</span>
          </Link>
          <Link
            href="/write"
            className="flex items-center gap-2 text-lg text-gray-500 hover:text-gray-900 tooltip tooltip-bottom"
            data-tip="Write Article"
          >
            <FiEdit /> <span className="text-sm">Write</span>
          </Link>
        </div>

        <div className="col-span-2 flex items-center gap-8 lg:gap-14 justify-end">
          {User ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end gap-0  hover:bg-white hover:cursor-default">
                <h4 className="text-sm">{User?.name}</h4>
                <p className="text-xs">{User?.occupation}</p>
              </div>{" "}
              <div className="dropdown dropdown-hover  dropdown-end">
                <div tabIndex={0} className="h-[35px] m-1">
                  <img
                    src={User?.photo || "/avatar.jpg"}
                    className="w-9 h-9 object-cover rounded-full border border-primary cursor-pointer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md border w-52"
                >
                  <li className="md:hidden border-b mb-2 pb-2">
                    <div className="flex flex-col gap-0  hover:bg-white hover:cursor-default">
                      <h4 className="text-sm">{User?.name}</h4>
                      <p className="text-xs">{User?.occupation}</p>
                    </div>
                  </li>
                  <li>
                    <Link href={`/profile/${User?.user_id}`}>
                      <RxAvatar /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link href={`/profile-update`}>
                      <IoSettingsOutline /> Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/write">
                      <BsPenFill /> Write
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <RxDashboard /> Dashboard
                    </Link>
                  </li>
                  <li className="border-t mt-1">
                    <button onClick={handleSignout}>
                      <AiOutlineLogout />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <button className="btn btn-sm bg-black hover:bg-black/70 float-right">
                Sign in
                <span className="hidden md:block">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
