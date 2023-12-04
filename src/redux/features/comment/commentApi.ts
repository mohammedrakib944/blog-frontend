import { apiSlice } from "../api/apiSlice";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GetComments
    getcomments: builder.query({
      query: (post_id) => ({
        url: `/comment/${post_id}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    // createComment
    createcomment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),

    // deleteComment
    deletecomment: builder.mutation({
      query: (comment_id) => ({
        url: `/comment/${comment_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
export const {
  useGetcommentsQuery,
  useCreatecommentMutation,
  useDeletecommentMutation,
} = commentApi;
