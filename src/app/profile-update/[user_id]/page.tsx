"use client";
import React, { use, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Alerts from "@/components/common/Alerts";

type Inputs = {
  name: string;
  occupation: string;
  bio: number;
  linkedin: string;
  github: string;
};

const UpdateProfile = () => {
  const { User } = useSelector((state: any) => state.user);
  const [dp, setDp] = useState<string>("/avatars/1.jpg");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const Images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "girl"];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const sendingData = { ...data, photo: dp };
    console.log("Form data: ", sendingData);
  };

  //   useEffect(() => {
  //     reset({ name: "Rakibuzzaman", occupation: "Software Engineer" });
  //   }, []);

  if (!User)
    return (
      <div className="min-h-screen pt-4">
        <Alerts status="error" message="You are not logged in!" />
      </div>
    );

  return (
    <div className="max-w-[500px] min-h-screen pt-10 mx-auto p-3">
      <h3 className="my-8 text-3xl font-bold">Update Profile</h3>
      <div className="flex gap-2 flex-wrap pb-2 my-2">
        {Images.map((image) => (
          <img
            key={image}
            src={`/avatars/${image}.jpg`}
            className={`w-[85px] cursor-pointer h-[85px] rounded-full mx-auto border ${
              dp.includes(image) && "border-primary"
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
            placeholder="Software Engineer"
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
            {...register("bio", { required: "Bio is required" })}
            placeholder="I am..."
          />
          {errors.bio && (
            <span className="text-xs text-red-600">{errors.bio?.message}</span>
          )}
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
        <button type="submit" className="btn btn-sm">
          Update
        </button>
        &nbsp;
        <button
          onClick={() => router.back()}
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
