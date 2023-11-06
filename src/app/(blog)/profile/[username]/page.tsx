import React from "react";
import Image from "next/image";
import { AiFillEye } from "react-icons/ai";
import Elon from "@/assets/photos/elon.jpg";
import Link from "next/link";
import Card from "@/components/home/Card";
import TopPostCard from "@/components/home/TopPostCard";

const page = () => {
  return (
    <div className="max-w-[700px] mx-auto px-3 pt-6">
      <div className="flex items-center gap-4">
        <Image
          className="w-[150px] h-[150px] object-cover rounded-full border border-primary"
          src={Elon}
          alt="Nothing"
        />
        <div>
          <h4>
            Abdulla Amin <span className="text-sm">(Software Engineer)</span>
          </h4>
          <div className="my-1">
            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est
              quidem perferendis.
            </p>
            <p className="mt-2 text-xs flex items-center gap-2 text-neutral">
              <span className="text-lg">
                <AiFillEye />
              </span>{" "}
              1212 views
            </p>
            <div className="flex gap-3 mt-4">
              <Link
                className="text-xs font-bold text-primary hover:underline"
                href="https://www.linkedin.com/in/md-rakibuzzaman-246a701b2/"
                target="_blank"
              >
                Linkedin
              </Link>
              <Link
                className="text-xs font-bold text-primary hover:underline"
                href="https://www.linkedin.com/in/md-rakibuzzaman-246a701b2/"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h4 className="mt-4">Articles from Abdulla Amin</h4>
      <div className="mt-3 mb-10 border-t">
        <TopPostCard />
        <TopPostCard />
        <TopPostCard />
        <TopPostCard />
      </div>
    </div>
  );
};

export default page;
