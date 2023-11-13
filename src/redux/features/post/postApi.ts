import { apiSlice } from "../api/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createPost
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
    }),
    // get all posts
    getAllPosts: builder.query({
      query: ({ page = 0 }) => ({
        url: `/post/page/${page}`,
      }),
    }),
    // get featured posts - 3 posts
    getFeaturedPost: builder.query({
      query: () => ({
        url: "/post/featured",
      }),
    }),

    // get posts by user_id
    getPostsByUserId: builder.query({
      query: (id) => ({
        url: `/post/user/${id}`,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsByUserIdQuery,
  useGetAllPostsQuery,
  useGetFeaturedPostQuery,
} = postApi;
