"use client";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const LikeHandle = ({ fixed }: { fixed?: boolean }) => {
  const [isLiked, setisLiked] = useState(false);
  const handleLike = () => {
    if (!fixed) {
      setisLiked((prev) => !prev);
    }
  };
  return (
    <div className="flex gap-4">
      <button className="flex gap-1 items-center group" onClick={handleLike}>
        <span
          className={
            isLiked ? "text-red-600" : "text-black group-hover:scale-110"
          }
        >
          <AiFillHeart />
        </span>{" "}
        <span className="text-xs"> 12 likes </span>
      </button>
      <p className="flex gap-2 items-center">
        <span className="text-xs"> 20 views</span>
      </p>
    </div>
  );
};

export default LikeHandle;
