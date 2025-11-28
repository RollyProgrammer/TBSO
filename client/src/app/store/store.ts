// Importing reducers, slices, and APIs for the Redux store
import counterReducer, { counterSlice } from "../../features/contact/counterReducer"; // Counter reducer and slice
import { configureStore, legacy_createStore } from "@reduxjs/toolkit"; // Redux Toolkit methods
import { useSelector, useDispatch } from "react-redux"; // Hooks for Redux state and dispatch
import { catalogApi } from "../../features/catalog/catalogApi"; // RTK Query API for catalog
import { uiSlice } from "../../layout/uiSlice"; // UI state slice
import { errorApi } from "../../features/about/errorApi"; // RTK Query API for error handling
import { basketApi } from "../../features/basket/basketApi"; // RTK Query API for basket/cart
import { catalogSlice } from "../../features/catalog/catalogSlice"; // Catalog state slice
import { accountApi } from "../../features/account/accountApi"; // RTK Query API for account/user info
import { checkoutApi } from "../../features/checkout/checkoutApi"; // RTK Query API for checkout
import { orderApi } from "../../features/orders/orderApi"; // RTK Query API for orders
import { adminApi } from "../../features/admin/adminApi"; // RTK Query API for admin features

// Legacy Redux store using a simple reducer (for backward compatibility)
export function configureTheStore() {
  return legacy_createStore(counterReducer);
}

// Modern Redux Toolkit store configuration
export const store = configureStore({
  reducer: {
    // RTK Query reducers for API slices
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

    // Local slices
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    catalog: catalogSlice.reducer,
  },
  // Adding middleware for RTK Query APIs
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      catalogApi.middleware,
      errorApi.middleware,
      basketApi.middleware,
      accountApi.middleware,
      checkoutApi.middleware,
      orderApi.middleware,
      adminApi.middleware
    ),
});

// TypeScript types for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>; // Type of the entire Redux state
export type AppDispatch = typeof store.dispatch; // Type of dispatch function

// Typed hooks for using Redux state and dispatch in components
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
