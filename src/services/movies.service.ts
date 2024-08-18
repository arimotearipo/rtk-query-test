// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import type { MovieResponse } from "./types";
import { axiosBaseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieResponse, string>({
      query: (id) => ({ url: `/movies/api/${id}` }),
    }),
    getAllMovies: builder.query<MovieResponse, void>({
      query: () => ({ url: `/movies/all` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetMovieByIdQuery, useGetAllMoviesQuery } = movieApi;
