import Image from "next/image";
import React from "react";
import Iphone from "@/assets/Banner/iphone.jpg";
import Link from "next/link";
import Man from "@/assets/photos/elon.jpg";

const Card = () => {
  return (
    <div className="group flex items-center pb-5 md:pb-1">
      <div>
        <Image
          src={Iphone}
          className="w-[200px] h-[90px] md:w-[360px] md:h-full object-cover cursor-pointer"
          alt="Iphone"
        />
      </div>
      <div className="pl-3 md:px-4 ">
        <div className="flex gap-2 items-center md:mb-2">
          <Image
            className="w-5 h-5 rounded-md object-cover"
            src={Man}
            alt="Profile"
          />
          <Link href="/profile/rakib23">
            <p className="text-xs hover:underline font-semibold">
              Md.Tomal Kazi
            </p>
          </Link>
        </div>
        <Link href="/article/what-the-article">
          <h6 className="text-sm py-1 md:py-0  md:text-base hover:underline group-hover:text-primary cursor-pointer font-bold">
            Tech you to use canvas to create a cool fragement cutting ou to use
            canvas
          </h6>
        </Link>
        <ul className="text-xs flex items-center gap-2 text-neutral mt-1 md:mt-0">
          <li className="border-r border-neutral pr-2">142 views</li>
          <li>12 Jun 2023</li>
          <li>
            <button className="hidden md:block md:border-l border-neutral pl-2 text-xs hover:underline mt-2 mb-2">
              Technology
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
