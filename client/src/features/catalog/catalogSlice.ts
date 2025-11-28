import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../app/models/productParams";

/**
 * Initial state for catalog filters and pagination
 */
const initialState: ProductParams = {
  pageNumber: 1,       // Current page
  pageSize: 20,        // Number of products per page
  types: [],           // Selected product types
  brands: [],          // Selected brands
  searchTerm: "",      // Search query
  orderBy: "name",     // Sorting option (default by name)
};

/**
 * Catalog slice to manage product listing parameters
 * Supports pagination, filtering, sorting, and search
 */
export const catalogSlice = createSlice({
  name: "catalogSlice",
  initialState,
  reducers: {
    /**
     * Set current page number
     */
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },

    /**
     * Set number of items per page
     */
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },

    /**
     * Set sorting option and reset page to 1
     */
    setOrderBy(state, action) {
      state.orderBy = action.payload;
      state.pageNumber = 1;
    },

    /**
     * Set selected product types and reset page to 1
     */
    setTypes(state, action) {
      state.types = action.payload;
      state.pageNumber = 1;
    },

    /**
     * Set selected brands and reset page to 1
     */
    setBrands(state, action) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },

    /**
     * Set search term and reset page to 1
     */
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.pageNumber = 1;
    },

    /**
     * Reset all filters and pagination to initial state
     */
    resetParams() {
      return initialState;
    },
  },
});

// Export actions to use in components
export const { 
  setBrands, 
  setOrderBy, 
  setPageNumber, 
  setPageSize, 
  setSearchTerm, 
  setTypes, 
  resetParams 
} = catalogSlice.actions;
