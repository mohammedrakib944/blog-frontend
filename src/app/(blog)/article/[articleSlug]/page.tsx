import React from "react";
import Link from "next/link";
import Image from "next/image";
import Elon from "@/assets/photos/elon.jpg";
import Banner from "@/assets/Banner/iphone.jpg";
import LikeHandle from "@/components/common/LikeHandle";
import Card from "@/components/home/Card";

const page = () => {
  return (
    <div className="max-w-[700px] mx-auto px-3">
      <div className="my-6 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Image
            className="w-[50px] h-[50px] object-cover rounded-full border border-primary"
            src={Elon}
            alt="Nothing"
          />
          <div>
            <Link href="/profile/rakib@gmail.com">
              <h4 className="hover:underline">Abdulla Amin</h4>
            </Link>
            <p className="text-xs md:text-sm">Software Engineer</p>
          </div>
        </div>
        <div className="text-xs md:text-sm">
          <span className="text-gray-500">Published on </span>
          <span className="font-bold"> 12 Jun 2023</span>
        </div>
      </div>
      <div>
        <p className="text-primary text-sm hover:underline font-bold mb-2">
          Technoogy
        </p>
        <h2 className="mb-3 font-extrabold">
          Apple Event September 7, 2022. Introducing an all-new iPhone lineup,
          rebuilt AirPods Pro, three new.
        </h2>
        <Image className="w-full rounded-md mb-3" src={Banner} alt="Banner" />
        <div className="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          voluptatibus quos explicabo dignissimos velit accusamus quis, porro,
          similique corporis tenetur minus! Ut eum perferendis veniam vel? Illum
          doloribus quidem sapiente!
        </div>
        <hr />
        <div className="mt-3">
          <LikeHandle />
        </div>
      </div>

      <div className="my-10">
        <h3 className="mb-3">Related Posts</h3>
        <div>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default page;
