"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreatePostMutation } from "@/redux/features/post/postApi";
import { useSelector } from "react-redux";
import { FaBackward, FaBookmark } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
// Editor
// import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Tags from "@/components/common/Tags";
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

// Main component
const Write = () => {
  const router = useRouter();
  const { User } = useSelector((state: any) => state.user);
  const { data: categories } = useGetAllCategoriesQuery(null);
  const [createPost, { isLoading, isSuccess, isError }] =
    useCreatePostMutation();

  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");

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

  const handleFormSubmit = (is_hide?: boolean) => {
    if (!User) return toast.error("You must login to create post");
    if (!content || !title || !category)
      return toast.error("Content,Title,Category is required");
    if (!tags.length) {
      return toast.error("Provide some tags for SEO");
    }

    if (User.is_banned) return toast.error("You are banned from creating post");

    const sendingData = {
      title: title,
      cover_image: coverImage,
      tags: tags.join(","),
      content: content,
      category: category,
      user_id: User.user_id,
      is_hide: is_hide,
    };
    createPost(sendingData);
  };

  // Handle response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success!");
      setContent("");
      setTitle("");
      setCoverImage("");
      setTags([]);
      setCategory("");
    }
    if (isError) {
      toast.error("Create post failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="homeLayout min-h-screen p-3">
      <Toaster />
      <div className="">
        <div className="pb-3 mb-3 flex justify-between border-b border-accent">
          <button
            type="button"
            className="btn btn-sm bg-gray-600 hover:bg-gray-700"
            onClick={() => router.back()}
          >
            <FaBackward /> Back
          </button>
          <div>
            <button
              disabled={isLoading}
              onClick={() => handleFormSubmit(true)}
              type="submit"
              className="btn btn-sm"
            >
              Save as Draft
              <FaBookmark />
            </button>
            &nbsp;
            <button
              disabled={isLoading}
              onClick={() => handleFormSubmit(false)}
              type="submit"
              className="btn bg-green-500 hover:bg-green-700 btn-sm"
            >
              Publish <FaCloudUploadAlt />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full pr-5">
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-base-100 text-4xl p-2 font-semibold outline-none mt-2"
            />
            <br />
            <div className="border-l border-neutral mt-4 pl-3">
              <p className="text-sm italic text-neutral cursor-default pl-2">
                [Select] for edit text
              </p>
              <ReactQuill
                value={content}
                placeholder="Write here ..."
                modules={module}
                onChange={setContent}
                theme="bubble"
              />
            </div>
          </div>
          <div className="md:min-w-[400px] md:border-l border-accent pl-5 md:max-w-[400px]">
            <p className="text-sm mb-2 font-semibold text-gray-500">
              Cover image URL
            </p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover Image URL"
                className="w-full border border-neutral bg-base-100 rounded-full px-4 py-2 text-sm outline-primary"
              />
            </div>

            <div className="mt-4">
              <p className="text-sm mb-2 font-semibold text-gray-500">
                Category
              </p>
              <select
                value={category}
                className="select select-bordered rounded-full w-full"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Choose a category
                </option>
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
            </div>

            <Tags tags={tags} setTags={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
