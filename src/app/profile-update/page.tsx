"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Alerts from "@/components/common/Alerts";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  name: string;
  occupation: string;
  bio: number;
  linkedin: string;
  github: string;
};

const Images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "girl"];

const UpdateProfile = () => {
  const [
    updateUser,
    { isError: updateError, isLoading: updating, isSuccess: updateDone, error },
  ] = useUpdateUserMutation();
  const { User } = useSelector((state: any) => state.user);
  const [dp, setDp] = useState<string>("/avatars/1.jpg");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const sendingData = { ...data, photo: dp };
    if (User) {
      updateUser({ id: User.user_id, data: sendingData });
    } else {
      toast.error("You are not logged in!");
    }
  };

  useEffect(() => {
    if (User) {
      reset(User);
      setDp(User?.photo);
    }
  }, [User]);

  useEffect(() => {
    if (!updating && updateError) {
      toast.error("Something went wrong!");
    }

    if (!updating && updateDone) {
      toast.success("Profile updated successfully!");
    }
  }, [updateError, updateDone]);

  if (!User)
    return (
      <div className="min-h-screen pt-4">
        <Alerts status="error" message="You are not logged in!" />
      </div>
    );

  return (
    <div className="max-w-[500px] min-h-screen pt-3 mx-auto p-3">
      <Toaster />
      <h3 className="my-5 text-3xl font-bold">Update Profile</h3>
      <div className="flex gap-2 flex-wrap pb-2 my-2">
        {Images.map((image) => (
          <img
            key={image}
            src={`/avatars/${image}.jpg`}
            className={`w-[85px] cursor-pointer h-[85px] rounded-full mx-auto border ${
              dp.includes(image) && "border-primary scale-105"
            } p-1`}
            alt=""
            onClick={() => setDp(`/avatars/${image}.jpg`)}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="text-sm pb-1">Name</label>
          <input
            type="text"
            className="inputs"
            {...register("name", { required: "Name is required" })}
            placeholder="Full name"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name?.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label className="text-sm pb-1">Occupation</label>
          <input
            type="text"
            className="inputs"
            {...register("occupation", { required: "Occupation is required" })}
            placeholder="Software engineer"
          />
          {errors.occupation && (
            <span className="text-xs text-red-600">
              {errors.occupation?.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="text-sm pb-1">Bio</label>
          <input
            type="text"
            className="inputs"
            {...register("bio")}
            placeholder="I am..."
          />
        </div>
        <div className="mb-3">
          <label className="text-sm pb-1">Linkedin</label>
          <input
            type="text"
            className="inputs"
            {...register("linkedin")}
            placeholder="URL"
          />
        </div>
        <div className="mb-6">
          <label className="text-sm pb-1">Github</label>
          <input
            type="text"
            className="inputs"
            {...register("github")}
            placeholder="URL"
          />
        </div>
        <button type="submit" disabled={updating} className="btn btn-sm">
          Update
        </button>
        &nbsp;
        <button
          onClick={() => router.back()}
          disabled={updating}
          type="button"
          className="btn btn-sm bg-gray-600 hover:bg-gray-700"
        >
          Cancle
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
