"use client";
import React from "react";
import TagsScklaton from "./TagsScklaton";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Categories = () => {
  const { data: categories } = useGetAllCategoriesQuery(null);
  console.log(categories);
  return (
    <div>
      {categories ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map((category: any) =>
            category.is_hide ? (
              ""
            ) : (
              <button className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black ">
                {category.category_name}
              </button>
            )
          )}
        </div>
      ) : (
        <TagsScklaton />
      )}
    </div>
  );
};

export default Categories;
