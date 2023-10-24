"use client";
import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";

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

const Write = () => {
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Context: ", content);
  };

  return (
    <div className="homeLayout p-3">
      <form
        className="max-w-[700px] mx-auto mt-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="🖼️ Cover Image URL"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full border-2 border-success rounded-full px-4 py-2 text-sm outline-primary"
          />

          <button
            type="submit"
            className="btn btn-sm bg-green-500 hover:bg-green-600 border-success"
          >
            Publish
          </button>
        </div>
        <input
          type="text"
          placeholder="Title..."
          className="w-full text-5xl font-semibold outline-none mb-4 mt-2"
        />

        <ReactQuill
          value={content}
          placeholder="Article description ..."
          modules={module}
          onChange={setContent}
        />
      </form>
    </div>
  );
};

export default Write;
