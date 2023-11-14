import React from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

const ViewLike = ({ Article }: any) => {
  return (
    <div className="my-4 pb-4 text-neutral">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <button className="text-lg hover:scale-110 hover:text-black">
            <AiFillHeart />
          </button>
          <span className="text-xs"> 5 likes</span>
        </div>
        <p className="text-xs flex gap-1 items-center">
          <span className="text-lg">
            <AiFillEye />
          </span>
          <span> {Article?.views} views</span>
        </p>
      </div>
    </div>
  );
};

export default ViewLike;
