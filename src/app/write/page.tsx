"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreatePostMutation } from "@/redux/features/post/postApi";
import { useSelector } from "react-redux";

// Editor
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Image handler
function imageHandler(this: any) {
  const tooltip = this.quill.theme.tooltip;
  const originalSave = tooltip.save;
  const originalHide = tooltip.hide;

  tooltip.save = function () {
    const range = this.quill.getSelection(true);
    const value = this.textbox.value;
    if (value) {
      this.quill.insertEmbed(range.index, "image", value, "user");
    }
  };
  // Called on hide and save.
  tooltip.hide = function () {
    tooltip.save = originalSave;
    tooltip.hide = originalHide;
    tooltip.hide();
  };
  tooltip.edit("image");
  tooltip.textbox.placeholder = "Embed URL";
}
type Inputs = {
  cover_image: string;
  title: string;
  category: string;
};

const Write = () => {
  const router = useRouter();
  const { User } = useSelector((state: any) => state.user);
  const { data: categories } = useGetAllCategoriesQuery(null);
  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation();
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ background: [] }],
    ["image"],
    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
  };

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (!User) return toast.error("You must login to create post");
    const sendingData = {
      ...data,
      content: content,
      user_id: User.user_id,
    };

    createPost(sendingData);
  };

  // Handle response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Create post successfully");
      reset();
      setContent("");
    }
    if (isError) {
      toast.error("Create post failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="homeLayout min-h-screen p-3">
      <Toaster />
      <form
        className="mt-5 flex flex-col md:flex-row gap-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="w-full border-r pr-5">
          <input
            type="text"
            placeholder="Title..."
            {...register("title", {
              required: "Title is required",
            })}
            className="w-full text-5xl font-semibold outline-none mt-2"
          />
          {errors.title && (
            <span className="text-xs text-red-600 pl-3">
              {errors.title?.message}
            </span>
          )}
          <br />
          <br />
          <ReactQuill
            value={content}
            placeholder="Article description ..."
            modules={module}
            onChange={setContent}
          />
        </div>
        <div className="min-w-[300px]">
          <p className="text-sm mb-2 font-semibold text-gray-500">
            Cover image URL
          </p>
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Cover Image URL"
              {...register("cover_image")}
              className="w-full border-2 rounded-full px-4 py-2 text-sm outline-primary"
            />
          </div>

          <div className="mt-4">
            <p className="text-sm mb-2 font-semibold text-gray-500">Category</p>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered rounded-md w-full"
              defaultValue={"Others"}
            >
              <option disabled>Choose a category</option>
              {categories &&
                categories.map((category: any) =>
                  !category.is_hide ? (
                    <option
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </option>
                  ) : null
                )}
            </select>
            {errors.category && (
              <span className="text-xs text-red-600">
                {errors.category?.message}
              </span>
            )}
          </div>
          <div className="bg-white py-10">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full btn btn-primary"
            >
              Publish
            </button>
            <button
              type="button"
              className="w-full mt-2 btn bg-gray-600 hover:bg-gray-700"
              onClick={() =>
                confirm("Are you cancle writing?") && router.back()
              }
            >
              Cancle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
