"use client";
import React from "react";
import { AiFillEye, AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import TopPostCard from "@/components/home/TopPostCard";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import Alerts from "@/components/common/Alerts";
import Scklaton from "@/components/profile/Scklaton";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { user_id: number } }) => {
  const { User: loggedInUser } = useSelector((state: any) => state.user);
  const {
    data: User,
    isError,
    isLoading,
    error,
  } = useGetUserByIdQuery(params.user_id, { refetchOnMountOrArgChange: true });

  console.log("User_id: ", loggedInUser?.user_id, User?.user_id);

  if (error) console.log("Error: ", error);

  if (isLoading) return <Scklaton />;

  if (!isLoading && isError)
    return <Alerts status="error" message="Could't fetch user!" />;

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
                <h4>
                  <span>{User?.name} </span>
                  <span className="text-sm">
                    {User?.occupation ? <span>(User?.occupation)</span> : ""}
                  </span>
                </h4>
                {loggedInUser?.user_id === User?.user_id && (
                  <Link
                    href={`/dashboard/profile-update/${User?.user_id}`}
                    className="tooltip tooltip-primary hover:text-primary"
                    data-tip="Update Profile"
                  >
                    <AiFillEdit />
                  </Link>
                )}
              </div>
              <div className="my-1">
                <p className="mt-2 text-sm">{User?.bio}</p>
                <p className="mt-2 text-xs flex items-center gap-2 text-neutral">
                  <span className="text-lg">
                    <AiFillEye />
                  </span>
                  1212 views
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    className="text-xs font-bold text-primary hover:underline"
                    href="https://www.linkedin.com/in/md-rakibuzzaman-246a701b2/"
                    target="_blank"
                  >
                    Linkedin
                  </Link>
                  <Link
                    className="text-xs font-bold text-primary hover:underline"
                    href="https://www.linkedin.com/in/md-rakibuzzaman-246a701b2/"
                    target="_blank"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <br />
          <h4 className="mt-4">Articles from Abdulla Amin</h4>
          <div className="mt-3 mb-10 border-t">
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
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
