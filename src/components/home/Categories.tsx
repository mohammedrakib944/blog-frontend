"use client";
import React from "react";
import Link from "next/link";
import TagsScklaton from "./TagsScklaton";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Categories = () => {
  const { data: categories } = useGetAllCategoriesQuery(null);
  return (
    <div>
      {categories ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map((category: any) => (
            <React.Fragment key={category.category_id}>
              {category.is_hide ? (
                ""
              ) : (
                <Link
                  href={`/search/${category.category_name}`}
                  className="btn btn-sm border border-accent bg-base-100 hover:bg-base-100 hover:border-primary hover:text-primary text-neutral"
                >
                  {category.category_name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <TagsScklaton />
      )}
    </div>
  );
};

export default Categories;
