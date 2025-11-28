import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

/**
 * RTK Query API service for simulating different types of errors.
 * Useful for testing error handling in the frontend.
 */
export const errorApi = createApi({
  reducerPath: "errorApi", // Unique key for storing this API's state in the Redux store
  baseQuery: baseQueryWithErrorHandling, // Custom base query with error handling and loading state
  endpoints: (builder) => ({
    // Simulate a 400 Bad Request error
    get400Error: builder.query<void, void>({
      query: () => ({ url: "buggy/bad-request" }),
    }),
    
    // Simulate a 401 Unauthorized error
    get401Error: builder.query<void, void>({
      query: () => ({ url: "buggy/unauthorized" }),
    }),
    
    // Simulate a 404 Not Found error
    get404Error: builder.query<void, void>({
      query: () => ({ url: "buggy/not-found" }),
    }),
    
    // Simulate a 500 Internal Server Error
    get500Error: builder.query<void, void>({
      query: () => ({ url: "buggy/server-error" }),
    }),
    
    // Simulate a validation error from the server
    getValidationError: builder.query<void, void>({
      query: () => ({ url: "buggy/validation-error" }),
    }),
  }),
});

// Export auto-generated hooks for each endpoint
export const {
    useLazyGet400ErrorQuery,       // Hook to lazily trigger a 400 error
    useLazyGet401ErrorQuery,       // Hook to lazily trigger a 401 error
    useLazyGet404ErrorQuery,       // Hook to lazily trigger a 404 error
    useLazyGet500ErrorQuery,       // Hook to lazily trigger a 500 error
    useLazyGetValidationErrorQuery,// Hook to lazily trigger a validation error
} = errorApi;
