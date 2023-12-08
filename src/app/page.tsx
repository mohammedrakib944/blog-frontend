"use client";
import AuthorCard from "@/components/home/AuthorCard";
import Categories from "@/components/home/Categories";
import TopPostCard from "@/components/home/TopPostCard";
import Scklaton from "@/components/home/PostsScklaton";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
import Popular from "@/components/home/Popular";
import { useGetTopAuthorsQuery } from "@/redux/features/post/postApi";
import AuthorScklaton from "@/components/home/AuthorScklaton";

export default function Home() {
  const { data: top_authors } = useGetTopAuthorsQuery(null);
  const { data: all_posts } = useGetAllPostsQuery(
    { page: 0 },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <main className="max-w-[1100px] mx-auto flex flex-col lg:grid lg:grid-cols-10 gap-5 mt-3 px-3">
      <div className="col-span-3 order-2 lg:order-1 h-fit lg:sticky top-[68px]">
        <p className="p-3">Top Authors</p>
        <div className=" bg-base-100 rounded-md border border-accent mt-1">
          {top_authors ? (
            top_authors.map((author: any, index: number) => (
              <AuthorCard
                key={author.user_id}
                author={author}
                border={index < top_authors.length - 1}
              />
            ))
          ) : (
            <AuthorScklaton />
          )}
        </div>
        <div>
          <p className="mt-2 p-3 font-bold">Tags</p>
          <Categories />
        </div>
      </div>

      <div className="col-span-7 order-1 lg:order-2">
        <Popular />
        <div>
          <div className="mt-6 pb-4 pt-2 px-3 md:px-10">Latest Articles</div>
          <div className="mt-3 border-t border-accent">
            {all_posts ? (
              all_posts.map((post: any) => (
                <TopPostCard key={post.post_id} post={post} />
              ))
            ) : (
              <div className="mt-8">
                <Scklaton />
              </div>
            )}
            <br />
            <br />
            {all_posts?.length > 30 && (
              <div className="pl-10 mb-10">
                <Link href={`/page/${1}`}>
                  <button className="btn btn-sm">
                    Next Page <AiOutlineArrowRight />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
