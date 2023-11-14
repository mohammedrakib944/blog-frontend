import { useGetFeaturedPostQuery } from "@/redux/features/post/postApi";
import Scklaton from "@/components/home/PostsScklaton";
import TopPostCard from "./TopPostCard";

const Popular = () => {
  const { data: featured_posts } = useGetFeaturedPostQuery(null);
  return (
    <div>
      <h4 className="border-b pr-4 mt-3 px-5 md:px-10 pb-4">
        Popular Articles
      </h4>
      {featured_posts ? (
        featured_posts.map((post: any) => (
          <TopPostCard key={post.post_id} post={post} />
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
