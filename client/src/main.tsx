// Importing core React modules
import { StrictMode } from "react";               // Helps highlight potential problems in development
import { createRoot } from "react-dom/client";    // React 18+ method to create root for rendering

// Importing Roboto font styles
import "@fontsource/roboto/300.css"; 
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Importing routing and Redux
import { RouterProvider } from "react-router-dom"; // Provides routing context for the app
import { router } from "./app/routes/Routes";      // App router configuration
import { Provider } from "react-redux";           // Provides Redux store context
import { store } from "./app/store/store";        // Redux store configuration

// Importing global CSS styles
import "./components/styles.css";                 // Make sure this file exists

// Importing Toast notifications
import { ToastContainer } from "react-toastify"; // Toast notifications container
import "react-toastify/dist/ReactToastify.css";  // Toast CSS

// Create the React root and render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Provide Redux store to the entire app */}
    <Provider store={store}>
      {/* Toast notifications container */}
      <ToastContainer 
        position='bottom-right' 
        hideProgressBar 
        theme="colored"
      />
      {/* RouterProvider manages app routes */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
