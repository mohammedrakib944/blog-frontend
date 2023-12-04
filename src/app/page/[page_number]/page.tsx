"use client";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useGetAllPostsQuery } from "@/redux/features/post/postApi";
import TopPostCard from "@/components/home/TopPostCard";
import Scklaton from "@/components/home/PostsScklaton";
import Link from "next/link";

const page = ({ params }: { params: { page_number: number } }) => {
  const { page_number } = params;
  const { data: all_posts, isLoading } = useGetAllPostsQuery(
    { page: page_number },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) return <Scklaton />;

  return (
    <div className="max-w-[800px] mx-auto px-3">
      <h4 className="border-b pr-4 mt-5 px-5 md:px-10 pb-4">
        Page {Number(page_number) + 1} Articles
      </h4>

      {all_posts &&
        all_posts.map((post: any) => (
          <TopPostCard key={post.post_id} post={post} />
        ))}

      {all_posts && (
        <div className="flex gap-3 px-12 mt-10 mb-20">
          {page_number > 0 && (
            <Link href={`/page/${Number(page_number) - 1}`}>
              <button className="btn btn-sm">
                <AiOutlineArrowLeft /> Previous Page
              </button>
            </Link>
          )}

          {all_posts?.length < 20 ? (
            ""
          ) : (
            <Link href={`/page/${Number(page_number) + 1}`}>
              <button className="btn btn-sm">
                Next Page <AiOutlineArrowRight />
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
