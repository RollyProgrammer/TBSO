import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParams } from "../../app/models/productParams";
import { filterEmptyValues } from "../../lib/util";
import type { Pagination } from "../../app/models/pagination";

/**
 * Catalog API slice using RTK Query to handle product-related operations:
 * - Fetch all products with optional filters and pagination
 * - Fetch product details by ID
 * - Fetch available filters (brands and types)
 * - Fetch newest products
 * - Fetch best-selling products
 */
export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    
    /**
     * Fetch all products with optional filtering and pagination
     * @param productParams ProductParams - filters like pageNumber, pageSize, searchTerm, types, brands, orderBy
     */
    fetchProducts: builder.query<{ items: Product[]; pagination: Pagination }, ProductParams>({
      query: (productParams) => ({
        url: "products",
        params: filterEmptyValues(productParams), // remove empty filter values
      }),
      transformResponse: (items: Product[], meta) => {
        // Read Pagination header if provided
        const paginationHeader = meta?.response.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return { items, pagination };
      },
    }),

    /**
     * Fetch a single product by its ID
     * @param productId Product ID
     */
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),

    /**
     * Fetch available product filters for brands and types
     */
    fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => "products/filters",
    }),

    /**
     * Fetch newest products with optional filters and pagination
     */
    fetchNewestProducts: builder.query<{ items: Product[]; pagination: Pagination }, ProductParams>({
      query: (productParams) => ({
        url: "products/newest",
        params: filterEmptyValues(productParams), // apply filters and pagination
      }),
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return { items, pagination };
      },
    }),

    /**
     * Fetch best-selling products with optional filters and pagination
     */
    fetchBestSellingProducts: builder.query<{ items: Product[]; pagination: Pagination }, ProductParams>({
      query: (productParams) => ({
        url: "products/bestselling",
        params: filterEmptyValues(productParams),
      }),
      transformResponse: (items: Product[], meta) => {
        const paginationHeader = meta?.response.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return { items, pagination };
      },
    }),
  }),
});

// Export hooks for React components
export const { 
  useFetchProductDetailsQuery, 
  useFetchProductsQuery, 
  useFetchFiltersQuery, 
  useFetchNewestProductsQuery, 
  useFetchBestSellingProductsQuery 
} = catalogApi;
