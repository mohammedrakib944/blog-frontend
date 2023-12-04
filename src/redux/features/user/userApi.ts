import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["User"],
    }),

    // get user by id
    getUserById: builder.query({
      query: (user_id: number) => ({
        url: `/user/${user_id}`,
      }),
    }),

    // Login User
    loginUser: builder.mutation({
      query: (data: { name: string; email: string }) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("token", JSON.stringify(result.data.token));
        } catch (err) {}
      },
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
