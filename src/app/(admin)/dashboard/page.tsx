"use client";
import ViewCard from "@/components/dashboard/ViewCard";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect, use } from "react";
import { MdSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  useDashboardDataQuery,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useSearchPostQuery,
} from "@/redux/features/post/postApi";
import { format, parseISO } from "date-fns";

const page = () => {
  const [deletePost, { isLoading: deleting, isSuccess: deleted }] =
    useDeletePostMutation();
  const { data: dashboardData } = useDashboardDataQuery(null);
  const { data: top_20_posts, isLoading } = useGetAllPostsQuery(0);
  const [Article, setArticle] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const {
    data: searchData,
    isLoading: searching,
    isError,
  } = useSearchPostQuery(keyword, {
    skip: keyword ? false : true,
    refetchOnMountOrArgChange: true,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText === "") return;
    setKeyword(searchText);
  };

  const handleDelete = (post_id: number) => {
    if (!post_id) return toast.error("Can't delete post");
    if (!confirm("Are you sure you want to delete this post?")) return;
    deletePost(post_id);
  };

  useEffect(() => {
    if (!deleting && deleted) {
      toast.success("Post deleted successfully");
    }
  }, [deleted, deleting]);

  useEffect(() => {
    if (!searchData && top_20_posts) {
      setArticle(top_20_posts);
    }
    if (searchData) {
      setArticle(searchData);
    }
  }, [top_20_posts, searchData]);

  return (
    <div className="homeLayout p-3">
      <Toaster />
      <h3 className="mb-2">Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ViewCard title="Total Posts" count={dashboardData?.total_posts} />
        <ViewCard title="Total Views" count={dashboardData?.total_views} />
        <ViewCard title="Total Users" count={dashboardData?.total_users} />
        <ViewCard title="Banned Users" count={dashboardData?.banned_users} />
      </div>
      <div className="text-center">
        <h3 className="mt-6">Search Articles</h3>
        <form
          onSubmit={handleSearch}
          className="mt-4 mb-6 col-span-4 overflow-hidden flex w-full max-w-[600px] border border-neutral hover:border-primary shadow-md hover:shadow-xl rounded-full mx-auto"
        >
          <input
            className="w-full bg-base-100 py-3 px-6 focus:outline-none text-sm"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <div className="grid place-items-center border-l border-accent  px-3">
            <MdSearch />
          </div>
        </form>
      </div>
      <div>
        {isError ||
          (searchData?.length === 0 && (
            <div className="max-w-[800px] min-h-screen mx-auto px-3">
              <div className="border-b pr-4 mt-5 px-5 md:px-10 pb-4">
                No articles found for{" "}
                <span className="font-bold">"{keyword}"</span>
              </div>
            </div>
          ))}

        {searchData && (
          <div className="mt-6 pb-4">
            Results for <span className="font-bold">"{keyword}"</span>
          </div>
        )}
        {isLoading || searching ? (
          <Loader />
        ) : (
          <div className="border border-accent rounded-xl overflow-x-auto">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th>ID</th>
                  <td>Title</td>
                  <td>Date</td>
                  <td>Author</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {Article &&
                  Article?.map((post: any) => (
                    <tr key={post?.post_id}>
                      <th>{post?.post_id}</th>
                      <td>
                        <Link
                          href={`/article/${post?.slug}`}
                          className="hover:text-primary"
                        >
                          {post?.title}
                        </Link>
                      </td>
                      <td>
                        {post?.date &&
                          format(parseISO(post?.date), "dd MMM yyyy")}
                      </td>
                      <td>
                        <Link
                          className="hover:text-primary"
                          href={`/profile/${post?.user_id}`}
                        >
                          {post?.name}
                        </Link>
                      </td>
                      <td className="flex gap-5">
                        <button
                          className="tooltip tooltip-secondary hover:text-red-600"
                          data-tip="Delete"
                          disabled={deleting}
                          onClick={() => handleDelete(post?.user_id)}
                        >
                          <RxCross2 />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="h-[100px]"></div>
      </div>
    </div>
  );
};

export default page;
