"use client";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import dynamic from "next/dynamic";

// Editor
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const write = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <div className="homeLayout p-3">
      <form className="mt-5 flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Title..."
            className="w-full text-5xl font-semibold outline-none"
          />
          <button className="btn btn-sm">Publish</button>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            data-tip="Set cover image"
            className="tooltip w-fit p-3 border rounded-full my-6"
            onClick={() => setOpen((prev) => !prev)}
          >
            <BiImageAdd />
          </button>
          {open && (
            <div>
              <input
                type="text"
                placeholder="Image URL"
                className="border rounded-full px-4 py-2 text-sm outline-primary"
              />
            </div>
          )}
        </div>
        <ReactQuill
          value={content}
          placeholder="Article description ..."
          onChange={setContent}
        />
      </form>
    </div>
  );
};

export default write;
