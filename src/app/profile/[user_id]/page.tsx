"use client";
import React from "react";
import {
  AiFillEye,
  AiFillEdit,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import Link from "next/link";
import TopPostCard from "@/components/home/TopPostCard";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
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
              <span className="text-sm font-semibold text-gray-600">
                {User?.occupation ? <span>{User?.occupation}</span> : ""}
              </span>
              <div className="my-1">
                <p className="mt-1 text-sm text-neutral">{User?.bio}</p>
                <div className="flex gap-3 mt-4">
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
          <h4 className="mt-4">
            {User_posts?.length} Articles from {User?.name}
          </h4>
          <div className="mt-3 mb-10 border-t">
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
