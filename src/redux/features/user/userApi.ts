import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
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

export const { useGetAllUsersQuery, useUpdateUserMutation } = userApi;
