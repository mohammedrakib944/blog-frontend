import { useGetFeaturedPostQuery } from "@/redux/features/post/postApi";
import Scklaton from "@/components/home/PostsScklaton";
import TopPostCard from "./TopPostCard";

const Popular = () => {
  const { data: featured_posts } = useGetFeaturedPostQuery(null);
  return (
    <div>
      <div className="border-b border-accent mt-3 px-3 md:px-10 pb-4">
        Popular Articles
      </div>
      {featured_posts ? (
        featured_posts.map((post: any, index: number) => (
          <TopPostCard
            isLast={index === featured_posts.length - 1 ? true : false}
            key={post.post_id}
            post={post}
          />
        ))
      ) : (
        <div className="mt-8">
          <Scklaton />
        </div>
      )}
    </div>
  );
};

export default Popular;
