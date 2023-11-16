"use client";
import React, { useEffect } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { PiSmileyXEyes } from "react-icons/pi";
import Link from "next/link";
import { useViewCountMutation } from "@/redux/features/post/postApi";

const ViewComment = ({ Article }: any) => {
  const [viewCount] = useViewCountMutation();

  // View handle
  useEffect(() => {
    function IncrementViewCount() {
      if (!Article) return;
      if (!sessionStorage.getItem(Article.post_id)) {
        // send View cound
        console.log("View count send");
        viewCount(Article.post_id);
      }
      sessionStorage.setItem(Article.post_id, "visited");
    }
    IncrementViewCount();
  }, []);

  return (
    <div className="my-4 pb-4">
      <div className="flex gap-5 items-center text-neutral">
        <div className="text-xs flex gap-1 items-center">
          <span className="text-xl">
            <PiSmileyXEyes />
          </span>
          <span> {Article?.views} views</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg">
            <AiOutlineMessage />
          </span>
          <span className="text-xs"> 5 Comments</span>
        </div>
      </div>

      {/* Comments */}
      <h4 className="border-t pr-4 mt-5 px-5 md:px-10 pb-4 pt-5">Comments 5</h4>
      <ul className="px-5 md:px-10">
        {/* <li className="text-neutral flex items-center gap-2 text-sm">
          <AiOutlineMessage /> Do the first comment
        </li> */}
        <li className="flex items-center gap-2 py-3">
          <div className="chat chat-start ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Link href={`/profile/23`} title="Visit Profile">
                  <img
                    src="/avatar.jpg"
                    alt="Tailwind CSS chat bubble component"
                    className="hover:scale-110 duration-200"
                  />
                </Link>
              </div>
            </div>
            <div className="chat-header flex items-center  gap-5">
              <div>
                <span className="pr-3">Rakib</span>
                <time className="text-xs opacity-50">12 jun 2023</time>
              </div>
            </div>
            <div className="chat-bubble bg-primary text-white text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
              optio magni, nadipisicing elit. Dolorum optio magni, nam
              architecto amet harum.
            </div>
          </div>
          <button
            className="flex items-center text-lg mt-6 text-gray-400 hover:text-red-800 tooltip"
            data-tip="Remove comment"
          >
            <MdDelete />
          </button>
        </li>

        <li className="flex items-center gap-2 py-3">
          <div className="chat chat-start ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Link href={`/profile/23`} title="Visit Profile">
                  <img
                    src="/avatar.jpg"
                    alt="Tailwind CSS chat bubble component"
                    className="hover:scale-110 duration-200"
                  />
                </Link>
              </div>
            </div>
            <div className="chat-header flex items-center  gap-5">
              <div>
                <span className="pr-3">Rakib</span>
                <time className="text-xs opacity-50">12 jun 2023</time>
              </div>
            </div>
            <div className="chat-bubble bg-primary text-white text-sm">
              Dolorum optio magni, nam architecto amet harum.
            </div>
          </div>
          <button
            className="flex items-center text-lg mt-6 text-gray-400 hover:text-red-800 tooltip"
            data-tip="Remove comment"
          >
            <MdDelete />
          </button>
        </li>
      </ul>

      {/* Comment form */}
      <form className="md:mx-10 border border-gray-400 mt-5 rounded-full flex h-full items-center shadow-md hover:shadow-lg">
        <input
          className="w-full bg-transparent py-3 px-5 focus:outline-none text-sm"
          type="text"
          // onChange={(e) => setSearchText(e.target.value)}
          placeholder="Comment..."
        />
        <button
          type="submit"
          className="border-l border-gray-400  text-lg px-5 text-primary"
        >
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default ViewComment;
