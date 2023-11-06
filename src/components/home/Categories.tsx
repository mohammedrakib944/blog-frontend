import React from "react";

const Categories = () => {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        HTML
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        CSS
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        JavaScript
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        TypeScript
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        Java
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        C++
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        Blog
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        Articles
      </button>
      <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
        Others
      </button>
    </div>
  );
};

export default Categories;
