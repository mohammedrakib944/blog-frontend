import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
    }),

    // get user by id
    getUserById: builder.query({
      query: (user_id: number) => ({
        url: `/user/${user_id}`,
      }),
    }),

    // Login User
    loginUser: builder.mutation({
      query: (data: { name: string; photo: string; email: string }) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("token", JSON.stringify(result.data.token));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ user_id, data }: { user_id: string; data: string }) => ({
        url: `/users/${user_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userApi;
