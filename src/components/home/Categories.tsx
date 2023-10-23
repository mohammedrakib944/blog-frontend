import React from "react";

const Categories = () => {
  return (
    <ul className="mb-3 flex flex-col gap-1">
      <li className="w-full border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        Javascript No alsd
      </li>
      <li className="w-full  border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        HTML
      </li>
      <li className="w-full  border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        CSS
      </li>
      <li className="w-full  border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        JavaScript
      </li>
      <li className="w-full  border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        Tech
      </li>
      <li className="w-full  border   px-4 py-2 rounded-sm bg-white text-xs hover:bg-error cursor-pointer duration-150">
        TypeScript
      </li>
    </ul>
  );
};

export default Categories;
