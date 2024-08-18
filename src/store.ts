import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApi } from "./services/movies.service";
import { directorApi } from "./services/directors.service";
import { healthCheckApi } from "./services/healthcheck.service";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [movieApi.reducerPath]: movieApi.reducer,
    [directorApi.reducerPath]: directorApi.reducer,
    [healthCheckApi.reducerPath]: healthCheckApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(directorApi.middleware)
      .concat(healthCheckApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
