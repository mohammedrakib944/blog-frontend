import Card from "@/components/home/Card";
import AuthorCard from "@/components/home/AuthorCard";
import Banner from "@/components/home/Banner";

export default function Home() {
  return (
    <main className="max-w-[1100px] mx-auto flex flex-col lg:grid lg:grid-cols-10 gap-3 mt-3 px-3">
      <div className="col-span-3 order-2 lg:order-1 h-fit bg-white rounded-md border lg:sticky top-[68px]">
        <p className="border-b p-3 font-bold">Author list</p>
        <AuthorCard border={true} />
        <AuthorCard border={true} />
        <AuthorCard border={true} />
        <AuthorCard border={true} />
        <AuthorCard />
      </div>
      <div className="col-span-7 order-1 lg:order-2">
        <Banner />
        <div>
          <ul className="text-sm font-bold flex gap-4">
            <li className="border-r pr-4 text-primary">Recommended</li>
            <li className="border-r pr-4">Latest</li>
            <li>Popular</li>
          </ul>
          <div className="mt-3 border-t">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="mt-10"></div>
        </div>
      </div>
    </main>
  );
}
