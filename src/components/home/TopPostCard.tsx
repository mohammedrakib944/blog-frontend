"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
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
const TopPostCard = ({ post }: any) => {
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
    <div className="flex gap-2 border-b border-accent py-5 pl-2 pr-5 md:px-10">
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
              <span className="text-primary font-semibold">{post?.name}</span>
            </Link>

            <span className="text-neutral">
              {post?.date && format(parseISO(post?.date), "dd MMM yyyy")}
            </span>
          </div>

          {User?.user_id === post?.user_id && (
            <div className="ml-4 pt-1 flex gap-3 items-center">
              <button
                disabled={deleting}
                onClick={() => handleDelete(post?.post_id)}
                className="ml-6 mr-2 tooltip tooltip-secondary"
                data-tip="Delete Post"
              >
                <AiFillDelete />
              </button>
              <Link
                href={`/write/${post?.slug}`}
                className="text-neutral text-lg tooltip  tooltip-secondary"
                data-tip="Edit Post"
              >
                <AiFillEdit />
              </Link>
              {post?.is_hide ? (
                <button
                  className="btn btn-xs bg-warning tooltip tooltip-secondary"
                  data-tip="Click to publish"
                  disabled={updating}
                  onClick={() => updateStatusHandler(post?.post_id, false)}
                >
                  Draft
                </button>
              ) : (
                <button
                  className="btn btn-xs tooltip tooltip-secondary"
                  data-tip="Click to Draft"
                  disabled={updating}
                  onClick={() => updateStatusHandler(post?.post_id, true)}
                >
                  Published
                </button>
              )}
            </div>
          )}
        </div>
        <Link href={`/article/${post?.slug}`}>
          <div className="mb-1 font-medium text-lg hover:text-primary">
            {post?.title}
          </div>
        </Link>
        <div className="text-sm text-neutral">{plainTextContent}</div>
        <Link href={`/search/${post?.category}`}>
          <span className="text-neutral cursor-pointer hover:underline text-xs font-normal">
            {post?.category}
          </span>
        </Link>
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
