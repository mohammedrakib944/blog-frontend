"use client";
import React from "react";
import TopPostCard from "@/components/home/TopPostCard";
import TagsScklaton from "@/components/home/TagsScklaton";
import { useState, useEffect } from "react";
import { useSearchPostQuery } from "@/redux/features/post/postApi";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSearchPosts } from "@/redux/features/post/searchSlice";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

const Search = () => {
  const { Posts } = useSelector((state: any) => state.search);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const {
    data: searchData,
    isLoading: searching,
    isError,
  } = useSearchPostQuery(keyword, {
    skip: keyword ? false : true,
  });
  const { data: categories } = useGetAllCategoriesQuery(null);

  const dispatch = useDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(searchText);
  };

  useEffect(() => {
    if (searchData) dispatch(setSearchPosts(searchData));
  }, [searchData]);

  return (
    <div className="max-w-[800px] min-h-screen mx-auto px-3">
      <form
        onSubmit={handleSearch}
        className="md:mx-10 border mt-5 rounded-md flex h-full items-center shadow-sm hover:shadow-lg"
      >
        <input
          className="w-full bg-transparent py-3 px-4 focus:outline-none text-sm"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Keyword..."
        />
        <button
          type="submit"
          className="border-l border-gray-300  text-lg px-3"
        >
          <MdSearch />
        </button>
      </form>

      {/* Categories */}
      <div>
        {categories ? (
          <div className="md:mx-10 mt-4 mb-3 flex flex-wrap gap-2">
            {categories.map((category: any) => (
              <React.Fragment key={category.category_id}>
                {category.is_hide ? (
                  ""
                ) : (
                  <button
                    onClick={() => setKeyword(category.category_name)}
                    className="btn btn-sm border-accent hover:bg-gray-100 bg-white text-black "
                  >
                    {category.category_name}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="md:mx-10 mt-4 mb-3 flex flex-wrap gap-2">
            <TagsScklaton />
          </div>
        )}
      </div>

      {isError ||
        (searchData?.length === 0 && (
          <div className="max-w-[800px] min-h-screen mx-auto px-3">
            <div className="border-b pr-4 mt-5 px-5 md:px-10 pb-4">
              No articles found for{" "}
              <span className="font-bold">"{keyword}"</span>
            </div>
          </div>
        ))}

      {searching && (
        <div className="max-w-[800px] min-h-screen mx-auto px-3">
          <div className="flex items-center justify-center gap-4 text-gray-400 mt-5">
            <span className="loading loading-dots loading-lg"></span> Searching
            ...
          </div>
        </div>
      )}

      {searchData && (
        <div className="border-b pr-4 mt-5 px-5 md:px-10 pb-4">
          Results for <span className="font-bold">"{keyword}"</span>
        </div>
      )}

      {Posts &&
        Posts.map((post: any) => (
          <TopPostCard key={post.post_id} post={post} />
        ))}
    </div>
  );
};

export default Search;
