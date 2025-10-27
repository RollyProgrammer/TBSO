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

interface CheckoutSessionResponse {
  checkoutUrl: string;
  paymentIntentId: string;
}

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, void>({
      query: () => ({
        url: "checkout",
        method: "POST",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // 🛠 update basket with PaymentIntent for tracking
          dispatch(
            basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
              draft.paymentIntentId = data.paymentIntentId;
            })
          );

          // ✅ redirect to PayMongo Checkout URL
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

export const { useCreateCheckoutSessionMutation } = checkoutApi;
