import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { MdSearch } from "react-icons/md";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import Link from "next/link";

const Navbar = () => {
  const isLoggedin = true;
  return (
    <div className="w-full border-b  bg-white z-50 sticky top-0 shadow-sm">
      <div className="homeLayout grid grid-cols-10 px-3 py-2">
        <Link href="/" className="col-span-3 flex items-center gap-2">
          <Image className="w-8" src={Logo} alt="Tech" />
          <h3>Techr</h3>
        </Link>
        <div className="col-span-4 bg-gray-200 overflow-hidden flex w-full max-w-[600px] rounded-lg">
          <input
            className="w-full bg-transparent py-2 px-4 focus:outline-none text-sm"
            type="text"
            placeholder="Search..."
          />
          <div className="grid place-items-center border-l  text-lg px-3">
            <MdSearch />
          </div>
        </div>
        <div className="col-span-3">
          {isLoggedin ? (
            <div className="float-right dropdown dropdown-hover  dropdown-end">
              <div tabIndex={0} className="h-[35px] m-1 flex gap-4">
                <div className="text-right">
                  <h4 className="text-sm">Adbulla Amin</h4>
                  <p className="text-xs">5 posts</p>
                </div>
                <img
                  src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=360"
                  className="w-9 h-9 object-cover rounded-full border border-primary cursor-pointer"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md border w-52"
              >
                <li>
                  <Link href="/profile/abdulla@gmail.com">
                    <RxAvatar /> Profie
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard">
                    <RxDashboard /> Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <button className="btn btn-sm float-right">Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
