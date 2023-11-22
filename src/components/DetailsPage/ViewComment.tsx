"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { PiSmileyXEyes } from "react-icons/pi";
import { useViewCountMutation } from "@/redux/features/post/postApi";
import { useSelector } from "react-redux";
import { parseISO, formatDistanceToNow } from "date-fns";
import {
  useCreatecommentMutation,
  useDeletecommentMutation,
  useGetcommentsQuery,
} from "@/redux/features/comment/commentApi";

const ViewComment = ({ Article }: any) => {
  const [viewCount] = useViewCountMutation();
  const { data: comments } = useGetcommentsQuery(Article.post_id, {
    refetchOnMountOrArgChange: true,
  });
  const [createComment, { isLoading, isError }] = useCreatecommentMutation();
  const [
    deletecomment,
    { isSuccess: removed, isError: removeError, isError: removing },
  ] = useDeletecommentMutation();
  const { User } = useSelector((state: any) => state.user);
  const [comment, setComment] = useState("");
  const [Tags, setTags] = useState([]);

  // Comment handle
  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!User) return toast.error("Please login first");
    const sendingData = {
      user_id: User.user_id,
      user_name: User.name,
      user_photo: User.photo || "/avatar.jpg",
      post_id: Article.post_id,
      comment,
    };
    createComment(sendingData);
    setComment("");
  };

  // Comment add handlers
  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  // Delete comment
  const handleDeleteComment = (comment_id: any) => {
    if (!confirm("Are you sure to delete this comment?")) return;
    deletecomment(comment_id);
  };

  // Comment delete messages
  useEffect(() => {
    if (!removing && removeError) {
      toast.error("Something went wrong");
    }
  }, [removed, removeError]);

  // Set tags
  useEffect(() => {
    if (Article) {
      setTags(Article.tags.split(","));
    }
  }, [Article]);

  // View handle
  useEffect(() => {
    function IncrementViewCount() {
      if (!Article) return;
      if (!sessionStorage.getItem(Article.post_id)) {
        viewCount(Article.post_id);
      }
      sessionStorage.setItem(Article.post_id, "visited");
    }
    IncrementViewCount();
  }, []);

  return (
    <div className="my-4 pb-4">
      <Toaster />

      <p className="text-sm font-semibold mt-3">Tags:</p>
      <div className="flex flex-wrap gap-2">
        {Tags?.length > 0 &&
          Tags?.map((tag: string, index: number) => (
            <Link key={index} href={`/search/${tag}`}>
              <span className="text-neutral hover:text-white hover:underline duration-150 text-sm cursor-pointer">
                #{tag}
              </span>
            </Link>
          ))}
      </div>
      <br />

      <div className="flex gap-6 items-center text-neutral border-t border-accent pt-6">
        <div className="text-xs flex gap-2 items-center">
          <span className="text-xl">
            <PiSmileyXEyes />
          </span>
          <span> {Article?.views} views</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">
            <AiOutlineMessage />
          </span>
          <span className="text-xs"> {comments?.length} Comments</span>
        </div>
      </div>

      {/* Comments */}
      <h4 className="border-t border-accent pr-4 mt-5 px-5 md:px-10 pb-4 pt-5">
        Comments {comments?.length}
      </h4>
      <ul className="px-5 md:px-10">
        {comments &&
          (comments.length > 0 ? (
            comments.map((SingleComment: any) => (
              <li
                key={SingleComment?.comment_id}
                className="flex items-center gap-2 py-3"
              >
                <div className="chat chat-start ">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Link
                        href={`/profile/${SingleComment?.user_id}`}
                        title="Visit Profile"
                      >
                        <img
                          src={SingleComment?.user_photo || "/avatar.jpg"}
                          alt={SingleComment?.user_name}
                          className="hover:scale-110 duration-200"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="chat-header flex items-center  gap-3 mb-1">
                    <div>
                      <Link
                        href={`/profile/${SingleComment?.user_id}`}
                        title="Visit Profile"
                      >
                        <span className="pr-3 text-neutral hover:underline">
                          {SingleComment?.user_name}
                        </span>
                      </Link>
                      <time className="text-xs opacity-50">
                        {formatDistanceToNow(parseISO(SingleComment?.date), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                  </div>
                  <div className="chat-bubble bg-primary text-white text-sm">
                    {SingleComment?.comment}
                  </div>
                </div>
                {SingleComment?.user_id === User?.user_id && (
                  <button
                    onClick={() =>
                      handleDeleteComment(SingleComment?.comment_id)
                    }
                    className="flex items-center text-lg mt-6 text-gray-400 hover:text-red-800 tooltip  tooltip-warning"
                    data-tip="Remove"
                  >
                    <MdDelete />
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="text-neutral flex items-center gap-2 text-sm">
              <AiOutlineMessage /> Do the first comment
            </li>
          ))}
      </ul>

      {/* Comment form */}
      <form
        onSubmit={handleSubmitComment}
        className="md:mx-10 border border-neutral hover:border-primary mt-5 rounded-full flex h-full items-center shadow-md hover:shadow-lg"
      >
        <input
          className="w-full bg-transparent py-3 px-5 focus:outline-none text-sm"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="border-l border-gray-400  text-lg px-5 text-primary"
        >
          {isLoading ? (
            <div className="flex items-center">
              <span className="loading loading-primary loading-spinner loading-xs"></span>
            </div>
          ) : (
            <IoIosSend />
          )}
        </button>
      </form>
    </div>
  );
};

export default ViewComment;
