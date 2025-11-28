import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice to manage UI state, specifically the global loading indicator.
 * Provides actions to start and stop a loading state, useful for API calls and async operations.
 */
export const uiSlice = createSlice({
  name: "ui", // Unique name of the slice in the Redux store
  initialState: {
    isLoading: false, // Boolean flag indicating if a loading operation is active
  },
  reducers: {
    /**
     * Sets the isLoading state to true.
     * Call this before starting an async operation to show a loading indicator.
     */
    startLoading: (state) => {
      state.isLoading = true;
    },
    
    /**
     * Sets the isLoading state to false.
     * Call this after completing an async operation to hide the loading indicator.
     */
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the actions to be used throughout the app
export const { startLoading, stopLoading } = uiSlice.actions;
