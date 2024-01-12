"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { BiHide } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useUpdateStatusMutation,
} from "@/redux/features/post/postApi";

function stripHTMLTags(html: any) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function truncateText(text: any, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Main component
const TopPostCard = ({ post, isLast = true }: any) => {
  const { User } = useSelector((state: any) => state.user);
  const [plainTextContent, setPlainTextContent] = useState("");
  const [deletePost, { isLoading: deleting, isSuccess: deleted }] =
    useDeletePostMutation();
  const [
    updateStatus,
    {
      isLoading: updating,
      isSuccess: updateSuccess,
      isError: updateError,
      error,
    },
  ] = useUpdateStatusMutation();

  const handleDelete = (post_id: number) => {
    if (!User) return toast.error("Please login to delete post");
    if (!confirm("Are you sure you want to delete this post?")) return;

    if (User.is_banned) return toast.error("You are banned from this site");

    deletePost(post_id);
  };

  const updateStatusHandler = (post_id: number, is_hide: boolean) => {
    if (!User) return toast.error("Please login first");
    let message = is_hide
      ? "Want to hide Article?"
      : "Want to publish Article?";
    if (!confirm(message)) return;
    const sendingData = { id: post_id, is_hide };
    updateStatus(sendingData);
  };

  // update messages
  useEffect(() => {
    if (!updating && updateSuccess) {
      toast.success("Update success!");
    }
    if (!updating && updateError) {
      toast.error("Update failed!");
    }
  }, [updateSuccess, updateError]);

  // delete messages
  useEffect(() => {
    if (!deleting && deleted) {
      toast.success("Post delete success!");
    }
  }, [deleted, deleting]);

  useEffect(() => {
    const plainTextContent = stripHTMLTags(post?.content);
    const truncatedContent = truncateText(plainTextContent, 150);
    setPlainTextContent(truncatedContent);
  }, [post]);

  return (
    <div className="relative flex gap-2 py-5 pl-2 pr-5 md:px-10">
      {!isLast && (
        <span className="none md:absolute left-[4.6rem] z-0 w-[2px] h-full bg-primary/20"></span>
      )}
      <Toaster />
      <div className="relative z-10 min-w-[50px] md:min-w-[100px]">
        <Link href={`/profile/${post?.user_id}`}>
          <img
            src={post?.photo || "/avatar.jpg"}
            className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] p-1 border border-dashed hover:border-solid border-primary/80 bg-base-100  hover:scale-105 duration-150 rounded-full object-cover "
            alt="Elone"
          />
        </Link>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center text-sm pb-2">
          <div>
            <Link href={`/profile/${post?.user_id}`} className="pr-4">
              <span className="text-primary font-semibold">{post?.name}</span>
            </Link>

            <span className="text-neutral">
              {post?.date && format(parseISO(post?.date), "dd MMM yyyy")}
            </span>
          </div>

          {User?.user_id === post?.user_id && (
            <div className="ml-4 pt-1 flex gap-3 items-center">
              {post?.is_hide ? (
                <span className="badge bg-red-700 text-gray-200">Draft</span>
              ) : (
                ""
              )}
            </div>
          )}
          {User?.user_id === post?.user_id && (
            <div className="dropdown dropdown-hover dropdown-left">
              <div tabIndex={0} role="button" className="m-1 text-lg">
                <IoMdMore />
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow-lg shadow-black/30 bg-base-100 rounded-lg border border-accent">
                <li>
                  <button
                    disabled={deleting}
                    onClick={() => handleDelete(post?.post_id)}
                    className="text-xs"
                  >
                    <AiFillDelete /> Delete
                  </button>
                  <Link className="text-xs" href={`/write/${post?.slug}`}>
                    <AiFillEdit /> Edit
                  </Link>
                </li>
                <li>
                  {post?.is_hide ? (
                    <button
                      className="text-xs"
                      disabled={updating}
                      onClick={() => updateStatusHandler(post?.post_id, false)}
                    >
                      <TbWorld /> Publish
                    </button>
                  ) : (
                    <button
                      className="text-xs"
                      disabled={updating}
                      onClick={() => updateStatusHandler(post?.post_id, true)}
                    >
                      <BiHide /> Hide
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>

        <Link href={`/article/${post?.slug}`} className="group">
          <div className="mb-1 font-medium text-lg group-hover:text-primary">
            {post?.title}
          </div>

          <div className="text-sm text-neutral ">{plainTextContent}</div>
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-xs flex items-center gap-2 text-neutral">
            <span className="text-lg">
              <AiFillEye />
            </span>
            {post?.views} views
          </p>

          <span className="badge badge-primary bg-gray-500/20 border-none text-neutral">
            {post?.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopPostCard;
