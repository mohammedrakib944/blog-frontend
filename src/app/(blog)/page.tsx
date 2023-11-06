"use client";
import Card from "@/components/home/Card";
import AuthorCard from "@/components/home/AuthorCard";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import TopPosts from "@/components/home/TopPosts";
import TopPostCard from "@/components/home/TopPostCard";

export default function Home() {
  return (
    <main className="max-w-[1100px] mx-auto flex flex-col lg:grid lg:grid-cols-10 gap-5 mt-3 px-3">
      <div className="col-span-3 order-2 lg:order-1 h-fit lg:sticky top-[68px]">
        <p className="p-3 font-bold">Author list</p>
        <div className=" bg-white rounded-md border mt-1">
          <AuthorCard border={true} />
          <AuthorCard border={true} />
          <AuthorCard border={true} />
          <AuthorCard border={true} />
          <AuthorCard />
        </div>
        <div>
          <p className="mt-2 p-3 font-bold">Tags</p>
          <Categories />
        </div>
      </div>

      <div className="col-span-7 order-1 lg:order-2">
        {/* <Banner /> */}
        <h4 className="border-b pr-4 mt-3 px-5 md:px-10 pb-4">Most Viewed</h4>
        <TopPosts />
        <div>
          <h4 className="mt-6 pb-4 pt-3 md:px-10">Latest</h4>
          <div className="mt-3 border-t">
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
            <TopPostCard />
          </div>
        </div>
      </div>
    </main>
  );
}
