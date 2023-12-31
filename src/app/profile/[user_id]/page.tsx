"use client";
import React from "react";
import { AiFillEdit, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import TopPostCard from "@/components/home/TopPostCard";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { IoMdAdd } from "react-icons/io";
import Alerts from "@/components/common/Alerts";
import Scklaton from "@/components/profile/Scklaton";
import { useSelector } from "react-redux";
import { useGetPostsByUserIdQuery } from "@/redux/features/post/postApi";

const page = ({ params }: { params: { user_id: number } }) => {
  const { User: loggedInUser } = useSelector((state: any) => state.user);
  const {
    data: User,
    isError,
    isLoading,
  } = useGetUserByIdQuery(params.user_id, { refetchOnMountOrArgChange: true });
  const { data: User_posts } = useGetPostsByUserIdQuery(params.user_id, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Scklaton />;

  if (!isLoading && isError)
    return (
      <div className="min-h-screen pt-4">
        <Alerts status="error" message="No user found" />
      </div>
    );

  return (
    <div className="max-w-[700px] mx-auto px-3 pt-6">
      {User ? (
        <>
          <div className="flex items-center gap-4">
            <img
              className="w-[150px] h-[150px] object-cover rounded-full border border-primary"
              src={User?.photo || "/avatar.jpg"}
              alt={User?.name}
            />
            <div>
              <div className="flex items-center gap-6 md:gap-10">
                <h4 className="text-2xl">
                  <span>{User?.name} </span>
                </h4>
                {loggedInUser?.user_id === User?.user_id && (
                  <Link
                    href={`/profile-update`}
                    className="tooltip  tooltip-secondary hover:text-primary"
                    data-tip="Update Profile"
                  >
                    <AiFillEdit />
                  </Link>
                )}
              </div>
              <span className="text-sm font-semibold text-neutral">
                {User?.occupation ? <span>{User?.occupation}</span> : ""}
              </span>

              <div className="my-1">
                <p className="mt-1 text-sm text-neutral mb-3">{User?.bio}</p>
                <div className="flex gap-3 mb-3">
                  {User?.linkedin ? (
                    <Link
                      className="text-xl hover:text-primary tooltip  tooltip-secondary"
                      href={User?.linkedin}
                      target="_blank"
                      data-tip="Linkedin"
                    >
                      <AiFillLinkedin />
                    </Link>
                  ) : (
                    ""
                  )}

                  {User?.github ? (
                    <Link
                      className="text-3xl hover:text-primary tooltip  tooltip-secondary"
                      href={User?.github}
                      data-tip="Github"
                      target="_blank"
                    >
                      <span className="text-xl">
                        <AiFillGithub />
                      </span>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="mt-4 flex justify-between items-center">
            <p>
              {User_posts?.length}{" "}
              <span className="text-neutral"> Articles from </span> {User?.name}{" "}
            </p>
            {loggedInUser?.user_id === User?.user_id && (
              <Link href={`/write`}>
                <button
                  className="btn btn-sm btn-primary tooltip tooltip-secondary"
                  data-tip="Write New Article"
                >
                  <IoMdAdd />
                </button>
              </Link>
            )}
          </div>
          <div className="mt-3 min-h-screen mb-10 border-t border-accent">
            {User_posts
              ? User_posts.map((post: any) => (
                  <React.Fragment key={post.post_id}>
                    <TopPostCard post={post} />
                  </React.Fragment>
                ))
              : ""}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-5xl my-10 text-center">404 No user found!</h1>
          <div className="h-10"></div>
        </div>
      )}
    </div>
  );
};

export default page;
