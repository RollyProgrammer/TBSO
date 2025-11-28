// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
// import type { Basket } from "../../app/models/basket";
// import { basketApi } from "../basket/basketApi";

// export const checkoutApi = createApi({
//   reducerPath: "checkoutApi",
//   baseQuery: baseQueryWithErrorHandling,
//   endpoints: (builder) => ({
//     createPaymentIntent: builder.mutation<Basket, void>({
//       query: () => {
//         return {
//           url: "payments",
//           method: "POST",
//           credentials: "include",
//         };
//       },
//       onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(
//             basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
//               draft.clientSecret = data.clientSecret;
//             })
//           );
//         } catch (error) {
//           console.log("Payment intent creation failed: ", error);
//         }
//       },
//     }),
//   }),
// });

// export const { useCreatePaymentIntentMutation } = checkoutApi;

// src/features/checkout/checkoutApi.ts




import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { basketApi } from "../basket/basketApi";

/**
 * Response returned when a checkout session is created
 */
interface CheckoutSessionResponse {
  checkoutUrl: string;      // URL to redirect the user to PayMongo checkout
  paymentIntentId: string;  // Unique ID for tracking the payment intent
}

/**
 * Checkout API slice
 * Handles creation of checkout sessions with PayMongo
 */
export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    /**
     * Creates a checkout session
     * - Sends POST request to backend `checkout` endpoint
     * - Updates basket with paymentIntentId for tracking
     * - Redirects user to PayMongo checkout URL
     */
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, void>({
      query: () => ({
        url: "checkout",
        method: "POST",
        credentials: "include", // ensures cookies/session are sent
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for query to complete
          const { data } = await queryFulfilled;

          // 🛠 Update basket in cache with paymentIntentId for tracking
          dispatch(
            basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
              draft.paymentIntentId = data.paymentIntentId;
            })
          );

          // ✅ Redirect user to PayMongo checkout
          if (data?.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          } else {
            console.error("Checkout session missing checkoutUrl:", data);
          }
        } catch (error) {
          console.error("Checkout session creation failed:", error);
        }
      },
    }),
  }),
});

// Export hook for components to call this mutation
export const { useCreateCheckoutSessionMutation } = checkoutApi;

