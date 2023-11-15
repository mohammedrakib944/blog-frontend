"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useUpdatePostMutation } from "@/redux/features/post/postApi";
import { useSelector } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetPostBySlugQuery } from "@/redux/features/post/postApi";

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
const EditArticle = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter();
  const { data: Post } = useGetPostBySlugQuery(slug, {
    refetchOnMountOrArgChange: false,
  });
  const [updatePost, { isLoading, isSuccess, isError }] =
    useUpdatePostMutation();
  const { User } = useSelector((state: any) => state.user);
  const { data: categories } = useGetAllCategoriesQuery(null);

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

  const handleUpdatePost = () => {
    if (!Post) return toast.error("Post not found");
    if (!User) return toast.error("You must login to create post");
    if (!content || !title) return toast.error("Content,Title is required");
    if (!tags.length) {
      return toast.error("Provide some tags for SEO");
    }

    const sendingData = {
      title: title,
      cover_image: coverImage,
      tags: tags.join(","),
      content: content,
      category: category,
    };
    updatePost({ id: Post.post_id, data: sendingData });
  };

  useEffect(() => {
    if (Post && User) {
      // if post author and logged user is not same then back
      if (Post?.author.user_id !== User.user_id) return router.back();

      setContent(Post.content);
      setTitle(Post.title);
      setCoverImage(Post.cover_image);
      setTags(Post.tags.split(","));
      setCategory(Post.category);
    }
  }, [Post, User]);

  // Handle response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Post update success");
    }
    if (isError) {
      toast.error("Post update failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="homeLayout min-h-screen p-3">
      <Toaster />
      <div className="">
        <div className="bg-white pb-3 mb-3 flex justify-between border-b">
          <button
            type="button"
            className="btn btn-sm bg-gray-600 hover:bg-gray-700"
            onClick={() => router.back()}
          >
            <FaBackward /> Back
          </button>
          <button
            disabled={isLoading}
            onClick={handleUpdatePost}
            type="submit"
            className="btn bg-green-500 hover:bg-green-700 btn-sm"
          >
            Update <FaCloudUploadAlt />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full border-r pr-5">
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl p-2 font-semibold outline-none mt-2"
            />
            <br />
            <ReactQuill
              value={content}
              placeholder="Write here ..."
              modules={module}
              onChange={setContent}
              theme="bubble"
            />
          </div>
          <div className="md:min-w-[400px] md:max-w-[400px]">
            <p className="text-sm mb-2 font-semibold text-gray-500">
              Cover image URL
            </p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover Image URL"
                className="w-full border-2 rounded-full px-4 py-2 text-sm outline-primary"
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
            </div>

            <Tags tags={tags} setTags={setTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
