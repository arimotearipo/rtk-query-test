// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import type { HealthCheck } from "./types";
import { axiosBaseQuery } from "./baseQuery";

// Define a service using a base URL and expected endpoints
export const healthCheckApi = createApi({
  reducerPath: "healthCheckApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getHealthCheck: builder.query<HealthCheck, void>({
      query: () => ({ url: `/healthcheck` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHealthCheckQuery } = healthCheckApi;
