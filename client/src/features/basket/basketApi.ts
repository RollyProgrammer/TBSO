import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Item, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";
import Cookies from "js-cookie";

/**
 * Type guard to check if the object is a Basket Item
 * @param product Product or Item
 * @returns true if the object is an Item
 */
function isBasketItem(product: Product | Item): product is Item {
  return (product as Item).quantity !== undefined;
}

/**
 * Basket API slice using RTK Query to handle basket operations
 * - fetch basket
 * - add item
 * - remove item
 * - clear basket
 * - buy now
 */
export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"], // Used for cache invalidation
  endpoints: (builder) => ({
    
    /**
     * Fetch the current basket
     */
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),

    /**
     * Add an item to the basket
     * Updates the cache optimistically
     */
    addbasketItem: builder.mutation<Basket, { product: Product | Item; quantity: number }>({
      query: ({ product, quantity }) => {
        const productId = isBasketItem(product) ? product.productId : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
        let isNewBasket = false;

        // Optimistic update
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const productId = isBasketItem(product) ? product.productId : product.id;
            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft.items.find((item) => item.productId === productId);
              if (existingItem) existingItem.quantity += quantity;
              else draft.items.push(isBasketItem(product) ? product : { ...product, productId, quantity });
            }
          })
        );

        try {
          await queryFulfilled;

          if (isNewBasket) dispatch(basketApi.util.invalidateTags(["Basket"]));
        } catch (error) {
          console.log(error);
          patchResult.undo(); // rollback on failure
        }
      },
    }),

    /**
     * Remove an item from the basket
     * Updates the cache optimistically
     */
    removeBasketItem: builder.mutation<void, { productId: number; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const itemIndex = draft.items.findIndex((item) => item.productId == productId);
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo(); // rollback
        }
      },
    }),

    /**
     * Clear the entire basket
     * Removes basket ID from cookies and resets cache
     */
    clearBasket: builder.mutation<void, void>({
      queryFn: () => ({ data: undefined }),
      onQueryStarted: async (_, { dispatch }) => {
        dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            draft.items = [];
            draft.basketId = "";
          })
        );
        Cookies.remove("basketId");
      },
    }),

    /**
     * Buy now functionality
     * Adds item to basket and navigates to /cart
     */
    buyNow: builder.mutation<Basket, { product: Product | Item; quantity: number }>({
      query: ({ product, quantity }) => {
        const productId = isBasketItem(product) ? product.productId : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
        let isNewBasket = false;
        const productId = isBasketItem(product) ? product.productId : product.id;

        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            if (!draft?.basketId) isNewBasket = true;

            const existingItem = draft.items.find((item) => item.productId === productId);
            if (existingItem) existingItem.quantity += quantity;
            else draft.items.push(isBasketItem(product) ? product : { ...product, productId, quantity });
          })
        );

        try {
          await queryFulfilled;

          if (isNewBasket) dispatch(basketApi.util.invalidateTags(["Basket"]));

          window.location.href = "/cart";
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

// Export hooks for use in React components
export const {
  useFetchBasketQuery,
  useAddbasketItemMutation,
  useRemoveBasketItemMutation,
  useClearBasketMutation,
  useBuyNowMutation,
} = basketApi;
