// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import type { MoviePayload, MovieResponse } from "./types";
import { axiosBaseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: "movieApi",
  tagTypes: ["movies"],
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieResponse, string>({
      query: (id) => ({ url: `/movies/${id}` }),
    }),
    getAllMovies: builder.query<MovieResponse, void>({
      query: () => ({ url: `/movies/all` }),
    }),
    deleteMovieById: builder.mutation<void, string>({
      query: (id) => ({ url: `/movies/${id}`, method: "DELETE" }),
      invalidatesTags: ["movies"],
    }),
    updateMovieById: builder.mutation<void, MoviePayload>({
      query: (payload) => ({
        url: `/movies/${payload.movie_id}`,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["movies"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetMovieByIdQuery,
  useGetAllMoviesQuery,
  useDeleteMovieByIdMutation,
  useUpdateMovieByIdMutation,
} = movieApi;
