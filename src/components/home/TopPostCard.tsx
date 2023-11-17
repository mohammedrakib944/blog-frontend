"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { format, parseISO } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { useDeletePostMutation } from "@/redux/features/post/postApi";

function stripHTMLTags(html: any) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncateText(text: any, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Main component
const TopPostCard = ({ post }: any) => {
  const { User } = useSelector((state: any) => state.user);
  const [plainTextContent, setPlainTextContent] = useState("");
  const [deletePost, { isLoading: deleting, isSuccess: deleted }] =
    useDeletePostMutation();

  const handleDelete = (post_id: number) => {
    if (!User) return toast.error("Please login to delete post");
    if (!confirm("Are you sure you want to delete this post?")) return;
    deletePost(post_id);
  };

  useEffect(() => {
    if (!deleting && deleted) {
      toast.success("Post deleted successfully");
    }
  }, [deleted, deleting]);

  useEffect(() => {
    const plainTextContent = stripHTMLTags(post?.content);
    const truncatedContent = truncateText(plainTextContent, 150);
    setPlainTextContent(truncatedContent);
  }, [post]);

  return (
    <div className="flex gap-2 border-b py-5 pl-2 pr-5 md:px-10">
      <Toaster />
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
        <div className="flex justify-between items-center text-sm pb-2">
          <div>
            <Link href={`/profile/${post?.user_id}`} className="pr-4">
              <span className="text-primary font-bold">{post?.name}</span>
            </Link>

            <span className="text-neutral">
              {post?.date && format(parseISO(post?.date), "dd MMM yyyy")}
            </span>
          </div>

          {User?.user_id === post?.user_id && (
            <div className="pt-1">
              <button
                disabled={deleting}
                onClick={() => handleDelete(post?.post_id)}
                className="ml-6 mr-2 tooltip  tooltip-secondary"
                data-tip="Delete Post"
              >
                <MdDeleteOutline />
              </button>
              <Link
                href={`/write/${post?.slug}`}
                className="text-neutral ml-2 tooltip  tooltip-secondary"
                data-tip="Edit Post"
              >
                <CiEdit />
              </Link>
            </div>
          )}
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
