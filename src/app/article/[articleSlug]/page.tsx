import React from "react";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/assets/Banner/iphone.jpg";
import { AiFillEye } from "react-icons/ai";
import TopPostCard from "@/components/home/TopPostCard";

const page = () => {
  return (
    <div className="max-w-[700px] mx-auto px-3">
      <h1 className="mb-3 font-extrabold mt-8 lg:mt-12">
        Apple Event September 7, 2022. Introducing an all-new iPhone lineup,
        rebuilt AirPods Pro, three new.
      </h1>
      <p className="text-primary text-sm hover:underline font-bold mb-2">
        Technoogy
      </p>
      <div className="my-4 flex items-center justify-between border-b pb-6 pt-3">
        <div className="flex items-center gap-3">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full border border-primary"
            src="/avatar.jpg"
            alt="Nothing"
          />
          <div>
            <Link href="/profile/7">
              <p className="hover:underline font-semibold">Abdulla Amin</p>
            </Link>
            <p className="text-xs">Software Engineer</p>
          </div>
        </div>
        <div className="text-xs md:text-sm">
          <span className="text-gray-500">Published on </span>
          <span className="font-bold"> 12 Jun 2023</span>
        </div>
      </div>
      <div className="my-4">
        <div className="flex gap-2 items-center">
          <p className="text-xs flex gap-2 items-center">
            <span className="text-lg">
              <AiFillEye />
            </span>
            <span> 20 views</span>
          </p>
        </div>
      </div>
      <div>
        <Image className="w-full rounded-md mb-6" src={Banner} alt="Banner" />
        <div className="mb-3 first-letter:text-5xl first-letter:font-extrabold first-letter:text-blue-500 first-letter:pr-2 first-letter:float-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          voluptatibus quos explicabo dignissimos velit accusamus quis, porro,
          similique corporis tenetur minus! Ut eum perferendis veniam vel? Illum
          doloribus quidem sapiente! explicabo dignissimos velit accusamus quis,
          porro, similique corporis tenetur minus! Ut eum perferendis veniam
          vel? Illum doloribus quidem sapiente!explicabo dignissimos velit
          accusamus quis, porro, similique corporis tenetur minus! Ut eum
          perferendis veniam vel? Illum doloribus quidem sapiente!explicabo
          dignissimos velit accusamus quis, porro, similique corporis tenetur
          minus! Ut eum perferendis veniam vel? Illum doloribus quidem
          sapiente!explicabo dignissimos velit accusamus quis, porro, similique
          corporis tenetur minus! Ut eum perferendis veniam vel? Illum doloribus
          quidem sapiente!
        </div>
        <br />
        <hr />
      </div>

      <div className="my-10">
        <h3 className="mb-3">Related Posts</h3>
        <div>
          <TopPostCard />
          <TopPostCard />
          <TopPostCard />
          <TopPostCard />
        </div>
      </div>
    </div>
  );
};

export default page;
