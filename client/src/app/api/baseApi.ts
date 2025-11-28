// Importing necessary utilities and types from Redux Toolkit and external libraries
import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query"; // RTK Query base query utilities
import { startLoading, stopLoading } from "../../layout/uiSlice"; // Redux actions to show/hide a loading indicator
import { toast } from "react-toastify"; // For showing user notifications/toasts
import { router } from "../routes/Routes"; // App router for navigation on certain errors

// Base query configuration for RTK Query
const customBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL, // Base API URL from environment variables
  credentials: "include", // Include cookies with requests
});

// Type representing potential API error responses
type ErrorResponse = string | { title: string } | { errors: string[] };

// Utility function to simulate delay (used in dev mode for loading indicators)
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

// Custom base query wrapper to handle loading state and errors globally
export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Start loading indicator
  api.dispatch(startLoading());

  // Optional artificial delay in development for testing loaders
  if (import.meta.env.DEV) await sleep();

  // Execute the actual API call
  const result = await customBaseQuery(args, api, extraOptions);

  // Stop loading indicator after request
  api.dispatch(stopLoading());

  // Handle errors if any
  if (result.error) {
    console.log(result.error); // Log the error for debugging

    // Determine actual status code (handle parsing errors)
    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    // Cast error response data
    const responseData = result.error.data as ErrorResponse;

    // Handle different HTTP status codes
    switch (originalStatus) {
      case 400: // Bad Request
        if (typeof responseData === "string") toast.error(responseData); // Display simple error string
        else if ("errors" in responseData) {
          // Concatenate array of validation errors and throw
          throw Object.values(responseData.errors).flat().join(",");
        } else toast.error(responseData.title); // Display title if present
        break;

      case 401: // Unauthorized
        if (typeof responseData === "object" && "title" in responseData) toast.error(responseData.title);
        break;

      case 403: // Forbidden
        if (typeof responseData === "object") toast.error("403 Forbidden");
        break;

      case 404: // Not Found
        if (typeof responseData === "object" && "title" in responseData) router.navigate("/not-found");
        break;

      case 500: // Internal Server Error
        if (typeof responseData === "object")
          router.navigate("/server-error", { state: { error: responseData } });
        break;

      default:
        break; // Other status codes are ignored
    }
  }

  // Return the result (either success or error) to the calling RTK Query endpoint
  return result;
};
