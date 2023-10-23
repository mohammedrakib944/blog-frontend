import Image from "next/image";
import React from "react";
import Iphone from "@/assets/Banner/iphone.jpg";
import Link from "next/link";

const Card = () => {
  return (
    <div className="group flex items-center border-b ">
      <div>
        <Image
          src={Iphone}
          className="w-[200px] h-[90px] md:w-[380px] md:h-full rounded object-cover cursor-pointer"
          alt="Iphone"
        />
      </div>
      <div className="pl-3 md:px-4 ">
        <button className="hidden md:block text-primary text-xs font-bold hover:underline mt-2 mb-2">
          Technology
        </button>
        <Link href="/article/what-the-article">
          <h6 className="text-sm  md:text-base hover:underline group-hover:text-primary cursor-pointer font-bold">
            Tech you to use canvas to create a cool fragement cutting ou to use
            canvas
          </h6>
        </Link>
        <ul className="mt-2 text-xs flex items-center gap-2 text-neutral">
          <li className="hidden md:block font-bold text-black">
            Md.Tomal Kazi
          </li>
          <li className="md:border-l border-r border-neutral pr-2 md:pl-2">
            142 views
          </li>
          <li>12 Jun 2023</li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
