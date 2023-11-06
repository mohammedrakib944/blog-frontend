import React from "react";
import Image from "next/image";
import Elone from "@/assets/photos/elon.jpg";
import { AiFillEye } from "react-icons/ai";
import Link from "next/link";

const TopPostCard = () => {
  return (
    <div className="flex gap-4 md:gap-6 border-b py-5 px-5 md:px-10">
      <div className="w-[100px]">
        <img
          src="/avatar.jpg"
          className="min-w-[40px] min-h-[40px] md:min-w-[60px] md:min-h-[60px] rounded-full object-cover border border-black"
          alt="Elone"
        />
      </div>
      <div>
        <p className="text-sm pb-3">
          <span className="text-primary font-bold">Elon Bro</span>{" "}
          <span className="text-neutral pl-4">23 jun 2023</span>
        </p>
        <Link href="/article/what-the-article">
          <h4 className="mb-1 hover:text-primary">
            Tech you to use canvas to create a cool fragement cutting ou to use
            canvas
          </h4>
        </Link>

        <p className="text-sm text-neutral">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit beatae
          reprehenderit veniam molestiae! Laboriosam molestiae tempora suscipit
          repudiandae illum inventore.
        </p>
        <span className="text-neutral cursor-pointer hover:underline text-xs font-normal">
          Technology
        </span>
        <p className="mt-2 text-xs flex items-center gap-2 text-neutral">
          <span className="text-lg">
            <AiFillEye />
          </span>{" "}
          1212 views
        </p>
      </div>
    </div>
  );
};

export default TopPostCard;
