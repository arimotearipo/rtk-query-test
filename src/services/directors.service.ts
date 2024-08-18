// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import type { DirectorResponse, DirectorPayload } from "./types";
import { axiosBaseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const directorApi = createApi({
  reducerPath: "directorApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getDirectorById: builder.query<DirectorResponse, string>({
      query: (id) => ({ url: `/directors/${id}` }),
    }),
    getAllDirectors: builder.query<DirectorResponse, void>({
      query: () => ({ url: `/directors/all` }),
    }),
    addDirector: builder.mutation<void, DirectorPayload[]>({
      query: (payload) => ({
        url: `/directors/add`,
        data: payload,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetDirectorByIdQuery,
  useGetAllDirectorsQuery,
  useAddDirectorMutation,
} = directorApi;
