"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { AiOutlineLogout, AiOutlineArrowRight } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit, FiSearch } from "react-icons/fi";
import { BsPenFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MdOutlineLightMode } from "react-icons/md";
// clerk
import { useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { User } = useSelector((state: any) => state.user);
  const [is_light, setIs_light] = useState(false);
  const { signOut } = useClerk();

  const handleSignout = () => {
    localStorage.removeItem("token");
    signOut();
    window.location.reload();
  };

  // handle theme change
  const handleThemeChange = (e: any) => {
    const theme = e.target.checked ? "blog_light" : "blog_dark";
    localStorage.setItem("theme", theme);
    changeTheme();
  };
  // handle theme change - Main function
  function changeTheme() {
    // 1. get the theme from local storage
    let theme: string = localStorage.getItem("theme") || "blog_dark";
    // 2. set is_light state of the component
    setIs_light(theme === "blog_light" ? true : false);
    // 3. set the theme to the data-theme of the html tag
    document.documentElement.setAttribute("data-theme", theme);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      changeTheme();
    }
  }, []);

  return (
    <div className="w-full border-b border-accent bg-base-200 z-50 sticky top-0">
      <div className="homeLayout  grid grid-cols-10 px-3 py-2">
        <Link href="/" className="col-span-3 flex items-center gap-2">
          <Image className="w-8" src={Logo} alt="Tech" />
          <h3>Techr</h3>
        </Link>

        <div className="col-span-5 md:pl-10 flex items-center gap-5 md:gap-10">
          <Link
            href="/search/~post"
            className="flex items-center gap-2 text-lg text-neutral hover:text-primary tooltip  tooltip-secondary tooltip-bottom"
            data-tip="Search"
          >
            <FiSearch /> <span className="text-sm hidden md:block">Search</span>
          </Link>
          <Link
            href="/write"
            className="flex items-center gap-2 text-lg text-neutral hover:text-primary tooltip  tooltip-secondary tooltip-bottom"
            data-tip="Write Article"
          >
            <FiEdit /> <span className="text-sm">Write</span>
          </Link>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={is_light}
              onChange={handleThemeChange}
              id="themeChange"
              className="toggle toggle-primary toggle-sm"
            />
            <label
              htmlFor="themeChange"
              className="text-sm text-neutral cursor-pointer"
            >
              <MdOutlineLightMode />
            </label>
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-8 lg:gap-14 justify-end">
          {User ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end gap-0 hover:cursor-default">
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
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-md border border-accent w-52"
                >
                  <li className="md:hidden border-b border-accent mb-2 pb-2">
                    <div className="flex flex-col gap-0 hover:cursor-default">
                      <h4 className="text-sm">{User?.name}</h4>
                      <p className="text-xs text-neutral">{User?.occupation}</p>
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
                  {User?.role === "admin" && (
                    <li>
                      <Link href="/dashboard">
                        <RxDashboard /> Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="border-t border-accent mt-1">
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
              <button className="min-w-[74px] btn btn-sm float-right">
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
