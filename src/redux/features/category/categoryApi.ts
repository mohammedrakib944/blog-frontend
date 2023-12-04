import { apiSlice } from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
      }),
      providesTags: ["Category"],
    }),

    // Add category
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // edit category
    editCategory: builder.mutation({
      query: (data) => ({
        url: `/category/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
