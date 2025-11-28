import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Address, User } from "../../app/models/user";
import type { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

/**
 * Account API slice using RTK Query to manage authentication and user information.
 * Includes login, registration, user info fetching, logout, and address management.
 */
export const accountApi = createApi({
  reducerPath: "accountApi", // Unique key in Redux store
  baseQuery: baseQueryWithErrorHandling, // Custom base query with error handling
  tagTypes: ["UserInfo"], // Tags used to manage cache invalidation
  endpoints: (builder) => ({
    
    /**
     * Login mutation
     * Sends user credentials to the server and invalidates cached user info on success.
     */
    login: builder.mutation<void, LoginSchema>({
      query: (credentials) => ({
        url: "login?useCookies=true",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"])); // Refresh user info cache
        } catch (error) {
          console.log(error);
        }
      },
    }),

    /**
     * Registration mutation
     * Sends registration data to the server.
     * Shows success toast and navigates to login page on success.
     */
    register: builder.mutation<void, object>({
      query: (credentials) => ({
        url: "account/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Registration successful! Please log in.");
          router.navigate("/login");
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),

    /**
     * User info query
     * Fetches currently authenticated user information.
     * Provides "UserInfo" tag for caching and invalidation.
     */
    userInfo: builder.query<User, void>({
      query: () => "account/user-info",
      providesTags: ["UserInfo"],
      keepUnusedDataFor: 300, // cache for 5 minutes
    }),

    /**
     * Logout mutation
     * Logs out the current user and invalidates user info cache.
     * Redirects to the home page.
     */
    logout: builder.mutation({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        router.navigate("/");
      },
    }),

    /**
     * Fetch user address query
     * Returns the currently saved shipping address for the user.
     */
    fetchAddress: builder.query<Address, void>({
      query: () => ({
        url: "account/address",
      }),
    }),

    /**
     * Update user address mutation
     * Updates the user's shipping address and optimistically updates the cache.
     */
    updateUserAddress: builder.mutation<Address, Address>({
      query: (address) => ({
        url: "account/address",
        method: "POST",
        body: address,
      }),
      onQueryStarted: async (address, { dispatch, queryFulfilled }) => {
        // Optimistically update cache
        const patchResult = dispatch(
          accountApi.util.updateQueryData("fetchAddress", undefined, (draft) => {
            Object.assign(draft, { ...address });
          })
        );

        try {
          await queryFulfilled; // confirm server response
        } catch (error) {
          patchResult.undo(); // rollback on error
          console.log(error);
        }
      },
    }),
  }),
});

// Export hooks for components to use
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation, 
  useUserInfoQuery, 
  useLazyUserInfoQuery, 
  useFetchAddressQuery, 
  useUpdateUserAddressMutation 
} = accountApi;
