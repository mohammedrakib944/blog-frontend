"use client";
import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import Link from "next/link";
import { format, parseISO } from "date-fns";

function stripHTMLTags(html: any) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncateText(text: any, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

const TopPostCard = ({ post }: any) => {
  const [plainTextContent, setPlainTextContent] = useState("");

  useEffect(() => {
    const plainTextContent = stripHTMLTags(post?.content);
    const truncatedContent = truncateText(plainTextContent, 150);
    setPlainTextContent(truncatedContent);
  }, [post]);

  return (
    <div className="flex gap-2 border-b py-5 pl-2 pr-5 md:px-10">
      <div className="min-w-[50px] md:min-w-[100px]">
        <Link href={`/profile/${post?.user_id}`}>
          <img
            src={post?.photo || "/avatar.jpg"}
            className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] hover:scale-105 duration-150 rounded-full object-cover "
            alt="Elone"
          />
        </Link>
      </div>
      <div>
        <div className="text-sm pb-2">
          <Link href={`/profile/${post?.user_id}`} className="pr-4">
            <span className="text-primary font-bold">{post?.name}</span>
          </Link>

          <span className="text-neutral">
            {post?.date && format(parseISO(post?.date), "dd MMM yyyy")}
          </span>
        </div>
        <Link href={`/article/${post?.slug}`}>
          <h4 className="mb-1 hover:text-primary">{post?.title}</h4>
        </Link>
        <div className="text-sm text-neutral">{plainTextContent}</div>
        <span className="text-neutral cursor-pointer hover:underline text-xs font-normal">
          {post?.category}
        </span>
        <p className="mt-2 text-xs flex items-center gap-2 text-neutral">
          <span className="text-lg">
            <AiFillEye />
          </span>
          {post?.views} views
        </p>
      </div>
    </div>
  );
};

export default TopPostCard;
