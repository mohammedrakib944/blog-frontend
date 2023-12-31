import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// production
export const API_URL = "https://blog-api.nrose.org/api";
// local
// export const API_URL = "http://localhost:50003/api";

export const apiSlice = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const LocalStorageToekn: string = localStorage.getItem("token")!;
      const token = JSON.parse(LocalStorageToekn);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 600, // 10 minutes
  tagTypes: ["User", "Category", "Post", "Comment", "Dashboard"],
  endpoints: () => ({}),
});
