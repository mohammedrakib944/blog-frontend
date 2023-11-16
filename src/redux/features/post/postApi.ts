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
      providesTags: ["Post"],
    }),
    // get featured posts - 3 posts
    getFeaturedPost: builder.query({
      query: () => ({
        url: "/post/featured",
      }),
      providesTags: ["Post"],
    }),
    // Top 10 authors
    getTopAuthors: builder.query({
      query: () => ({
        url: "/post/top_authors",
      }),
    }),
    // get posts by user_id
    getPostsByUserId: builder.query({
      query: (id) => ({
        url: `/post/user/${id}`,
      }),
      providesTags: ["Post"],
    }),
    // get post by slug
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `/post/${slug}`,
      }),
    }),

    // update post by post id
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    // search posts
    searchPost: builder.query({
      query: (keyword) => ({
        url: `/post/search?keyword=${keyword}`,
      }),
    }),
  }),
});

export const {
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  useCreatePostMutation,
  useSearchPostQuery,
  useGetPostsByUserIdQuery,
  useGetAllPostsQuery,
  useGetTopAuthorsQuery,
  useGetFeaturedPostQuery,
} = postApi;
