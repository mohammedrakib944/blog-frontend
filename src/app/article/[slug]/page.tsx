import "@/components/DetailsPage/CodeColor.css";
import React from "react";
import Link from "next/link";
import TopPostCard from "@/components/home/TopPostCard";
import { notFound } from "next/navigation";
import { API_URL } from "@/redux/features/api/apiSlice";
import { format, parseISO } from "date-fns";
import ViewLike from "@/components/DetailsPage/ViewLike";

// Get articlel from server
async function getArticle(slug: string) {
  const res = await fetch(`${API_URL}/post/${slug}`, { cache: "no-store" });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

// Get Popular articles
async function popularArticles() {
  const res = await fetch(`${API_URL}/post/featured`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) return;

  return res.json();
}

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const Article = await getArticle(slug);
  const PoularArticles = await popularArticles();

  return (
    <div className="max-w-[700px] mx-auto px-4">
      <h1 className="mb-3 font-extrabold mt-8 lg:mt-12">{Article?.title}</h1>
      <p className="text-primary text-sm hover:underline font-bold mb-2">
        {Article?.category}
      </p>
      <div className="mt-4 mb-6 flex items-center justify-between border-b pb-5 pt-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${Article?.author?.user_id}`}>
            <img
              className="w-[50px] h-[50px] object-cover rounded-full border border-primary"
              src={Article?.author?.photo || "/avatar.jpg"}
              alt="Author Image"
            />
          </Link>
          <div>
            <Link
              href={`/profile/${Article?.author?.user_id}`}
              className="font-semibold text-gray-600 hover:text-gray-900"
            >
              {Article?.author?.name}
            </Link>
            <p className="text-xs">{Article?.author?.occupation}</p>
          </div>
        </div>
        <div className="text-xs md:text-sm">
          <span className="text-gray-500">Published on </span>
          <span className="font-bold">
            {Article?.date && format(parseISO(Article?.date), "dd MMM yyyy")}
          </span>
        </div>
      </div>
      <div>
        {Article?.cover_image ? (
          <img
            className="w-full rounded-md mb-6"
            src={Article?.cover_image}
            alt="Cover Image"
          />
        ) : (
          ""
        )}
        <div className="mb-3">
          <div dangerouslySetInnerHTML={{ __html: Article?.content }} />
        </div>
        <br />
      </div>
      <ViewLike Article={Article} />
      <div className="h-[50px]"></div>
      <div>
        <h4 className="border-b pr-4 mt-3 px-5 md:px-10 pb-4">
          Popular Articles
        </h4>
        {PoularArticles &&
          PoularArticles.map((post: any) => (
            <TopPostCard key={post.post_id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default page;