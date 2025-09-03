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

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Basket } from "../../app/models/basket";
import { basketApi } from "../basket/basketApi";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<Basket, void>({
      query: () => ({
        url: "payments", // Your backend endpoint
        method: "POST",
        credentials: "include", // If using cookies for auth
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          // Update basket in RTK query cache
          dispatch(
            basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
              draft.clientSecret = data.clientSecret;
              draft.paymentIntentId = data.paymentIntentId; // store intentId too
            })
          );
        } catch (error) {
          console.error("Payment intent creation failed:", error);
        }
      },
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = checkoutApi;
