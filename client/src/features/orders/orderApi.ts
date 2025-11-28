import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { CreateOrder, Order } from "../../app/models/order";

/**
 * RTK Query API slice for order-related endpoints
 */
export const orderApi = createApi({
    reducerPath: 'orderApi', // Unique key for this API slice
    baseQuery: baseQueryWithErrorHandling, // Handles API requests with built-in error handling
    endpoints: (builder) => ({
        /**
         * Fetch all orders
         * GET /orders
         */
        fetchOrders: builder.query<Order[], void>({
            query: () => 'orders',
        }),

        /**
         * Fetch details of a single order by ID
         * GET /orders/:id
         */
        fetchOrderDetailed: builder.query<Order, number>({
            query: (id) => ({
                url: `orders/${id}`,
            }),
        }),

        /**
         * Create a new order
         * POST /orders
         * @param order - Order details conforming to CreateOrder type
         */
        createOrder: builder.mutation<Order, CreateOrder>({
            query: (order) => ({
                url: 'orders',
                method: 'POST',
                body: order,
            }),
        }),
    }),
});

// Hooks generated automatically by RTK Query
export const { 
    useFetchOrdersQuery, 
    useFetchOrderDetailedQuery, 
    useCreateOrderMutation 
} = orderApi;
