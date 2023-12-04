import { apiSlice } from "../api/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // dashboard data
    dashboardData: builder.query({
      query: () => ({
        url: "/post/dashboard",
      }),
      providesTags: ["Dashboard"],
    }),
    // get all posts
    getAllPosts: builder.query({
      query: ({ page = 0 }) => ({
        url: `/post/page/${page}`,
      }),
      providesTags: ["Post"],
    }),
    // createPost
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post", "Dashboard"],
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
    // update status
    updateStatus: builder.mutation({
      query: ({ id, is_hide }) => ({
        url: `/post/status/${id}`,
        method: "PATCH",
        body: { is_hide },
      }),
      invalidatesTags: ["Post"],
    }),
    // search posts
    searchPost: builder.query({
      query: (keyword) => ({
        url: `/post/search?keyword=${keyword}`,
      }),
    }),

    // view count
    viewCount: builder.mutation({
      query: (id: number) => ({
        url: `/post/view/${id}`,
        method: "PATCH",
      }),
    }),

    // delete post by post id
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post", "Dashboard"],
    }),
  }),
});

export const {
  useDashboardDataQuery,
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  useUpdateStatusMutation,
  useCreatePostMutation,
  useSearchPostQuery,
  useGetPostsByUserIdQuery,
  useGetAllPostsQuery,
  useGetTopAuthorsQuery,
  useGetFeaturedPostQuery,
  useViewCountMutation,
  useDeletePostMutation,
} = postApi;
