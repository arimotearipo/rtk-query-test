// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { type DirectorResponse, type DirectorPayload } from "./types";
import { axiosBaseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const directorApi = createApi({
  reducerPath: "directorApi",
  tagTypes: ["directors"],
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/directors" }),
  endpoints: (builder) => ({
    getDirectorById: builder.query<DirectorResponse, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
    getAllDirectors: builder.query<DirectorResponse, void>({
      query: () => ({ url: `/` }),
    }),
    addDirector: builder.mutation<void, DirectorPayload[]>({
      query: (payload) => ({
        url: `/add`,
        data: payload,
        method: "POST",
      }),
    }),
    deleteDirectorById: builder.mutation<void, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["directors"],
    }),
    updateDirectorById: builder.mutation<void, DirectorPayload>({
      query: (payload) => ({
        url: `${payload.director_id}`,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["directors"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetDirectorByIdQuery,
  useGetAllDirectorsQuery,
  useAddDirectorMutation,
  useUpdateDirectorByIdMutation,
  useDeleteDirectorByIdMutation,
} = directorApi;
