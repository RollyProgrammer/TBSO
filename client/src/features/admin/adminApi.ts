import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Product } from "../../app/models/product";

/**
 * Admin API slice using RTK Query to manage product CRUD operations.
 * Handles creating, updating, and deleting products from the backend.
 */
export const adminApi = createApi({
  reducerPath: "adminApi", // Unique key in Redux store
  baseQuery: baseQueryWithErrorHandling, // Custom base query with error handling
  endpoints: (builder) => ({
    
    /**
     * Create a new product
     * Sends a FormData object to the server to create a new product.
     * Returns the newly created Product.
     */
    createProduct: builder.mutation<Product, FormData>({
      query: (data: FormData) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * Update an existing product
     * Accepts an object with `id` and FormData `data` containing updated fields.
     * Appends the id to the FormData before sending the PUT request.
     */
    updateProduct: builder.mutation<void, { id: number; data: FormData }>({
      query: ({ id, data }) => {
        data.append("id", id.toString()); // Ensure id is included in form data
        return {
          url: "products",
          method: "PUT",
          body: data,
        };
      },
    }),

    /**
     * Delete a product
     * Sends a DELETE request to the server using the product's ID.
     */
    deleteProduct: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for React components to use
export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminApi;
