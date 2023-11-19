"use client";
import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";

const Tags = ({ tags, setTags }: { tags: string[]; setTags: any }) => {
  const [text, setText] = useState("");

  const handleText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    setTags((prev: string[]) => [...prev, text]);
    setText("");
  };

  const handleDelete = (tag: string) => {
    let newTags = tags.filter((item) => item != tag);
    setTags(newTags);
  };

  return (
    <div className="md:w-[400px] pl-1">
      <p className="text-sm mt-4 font-semibold text-gray-500">Tags (For SEO)</p>
      {tags.length > 0 && (
        <button
          className="text-xs bg-red-600 text-white rounded-full px-3 py-1 border my-2 border-red-800"
          onClick={() => setTags([])}
        >
          Clear All
        </button>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="w-fit uppercase text-base-100 flex text-xs font-medium items-center px-4 py-2 rounded-md bg-gray-800"
            >
              {tag}
              <button
                className="ml-4 text-lg hover:text-red-500"
                onClick={() => handleDelete(tag)}
              >
                <FiDelete />
              </button>
            </div>
          ))}
      </div>

      <form
        onSubmit={handleText}
        className="flex justify-around items-center gap-2"
      >
        <input
          type="text"
          className="w-full bg-base-100 inputs rounded-full"
          value={text}
          placeholder="Type a keyword ..."
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-sm" type="submit">
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default Tags;
