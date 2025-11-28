// Importing necessary modules from React Router and app components/pages
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App"; // Main app layout
import HomePage from "../../features/home/Home"; // Homepage
import ProductDetails from "../../features/catalog/ProductDetails"; // Product details page
import ProductList from "../../features/catalog/ProductList"; // Product list page
import AboutPage from "../../features/about/AboutPage"; // About page
import NewItems from "../../pages/NewItems"; // New items page
import Best from "../../components/Best"; // Best items component
import BestSeller from "../../pages/BestSeller"; // Best seller page
import Collection from "../../pages/Collection"; // Collection page
import Cart from "../../pages/Cart"; // Shopping cart page
import Login from "../../pages/Login"; // Login page
import SignUp from "../../pages/SignUp"; // Signup page
import ContactPage from "../../features/contact/ContactPage"; // Contact page
import ServerError from "../errors/ServerError"; // Server error page
import NotFound from "../errors/NotFound"; // 404 Not found page
import CheckoutPage from "../../features/checkout/CheckoutPage"; // Checkout page
import RequireAuth from "./RequireAuth"; // Authentication guard for protected routes
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess"; // Checkout success page
import OrdersPage from "../../features/orders/OrdersPage"; // User orders list page
import OrderDetailedPage from "../../features/orders/OrderDetailedPage"; // Specific order details
import InventoryPage from "../../features/admin/InventoryPage"; // Inventory management page (admin)
import SellerApp from "../../features/seller/SellerApp"; // Seller app layout
import SellerDashboard from "../../features/seller/sellercomponents/SellerDashboard"; // Seller dashboard
import SellerProduct from "../../features/seller/sellercomponents/sellerproducts/SellerProduct"; // Seller product management
import SellerSalesOrder from "../../features/seller/sellercomponents/sellersalesorder/SellerSalesOrder"; // Seller sales orders
import SellerPromotions from "../../features/seller/sellercomponents/SellerPromotions"; // Seller promotions management
import SellerReports from "../../features/seller/sellercomponents/SellerReports"; // Seller reports
import SellerPaymentSetup from "../../features/seller/sellercomponents/SellerPaymentSetup"; // Seller payment configuration
import SellerCourierSetup from "../../features/seller/sellercomponents/SellerCourierSetup"; // Seller courier setup
import SellerSalesCustomer from "../../features/seller/sellercomponents/sellersalesorder/SellerSalesCustomer"; // Sales customer page
import SellerProductCategory from "../../features/seller/sellercomponents/sellerproducts/SellerProductCategory"; // Product categories for seller

// Main router configuration using createBrowserRouter
export const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main app layout
    children: [
      {
        // Routes that require authentication
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <CheckoutPage /> }, // Checkout page for authenticated users
          { path: "checkout/success", element: <CheckoutSuccess /> }, // Checkout success page
          { path: "orders", element: <OrdersPage /> }, // User's orders list
          { path: "orders/:id", element: <OrderDetailedPage /> }, // Specific order details
          { path: "inventory", element: <InventoryPage /> }, // Admin inventory management
        ],
      },
      { path: "/", element: <HomePage /> }, // Homepage route
      { path: "new", element: <NewItems /> }, // New items page
      { path: "best", element: <Best /> }, // Best items component/page
      { path: "bestseller", element: <BestSeller /> }, // Best seller page
      { path: "collection", element: <Collection /> }, // Collection page
      { path: "aboutpage", element: <AboutPage /> }, // About page
      { path: "contactpage", element: <ContactPage /> }, // Contact page
      { path: "server-error", element: <ServerError /> }, // Server error page
      { path: "not-found", element: <NotFound /> }, // 404 page
      { path: "catalog/:id", element: <ProductDetails /> }, // Product details page
      { path: "productlist", element: <ProductList products={[]} cardWidth={""} /> }, // Product list page
      { path: "cart", element: <Cart /> }, // Shopping cart
      { path: "login", element: <Login /> }, // Login page
      { path: "signup", element: <SignUp /> }, // Signup page
      { path: "/*", element: <Navigate replace to="/not-found" /> }, // Catch-all for undefined routes
    ],
  },
  {
    path: "/seller", // Seller section
    element: <SellerApp />, // Seller app layout
    children: [
      { index: true, element: <SellerDashboard /> }, // Default route for /seller
      { path: "dashboard", element: <SellerDashboard /> }, // Seller dashboard
      { path: "products", element: <SellerProduct /> }, // Manage seller products
      { path: "productcategory", element: <SellerProductCategory /> }, // Manage product categories
      { path: "salesorder", element: <SellerSalesOrder /> }, // Manage sales orders
      { path: "salescustomer", element: <SellerSalesCustomer /> }, // Manage sales customers
      { path: "promotions", element: <SellerPromotions /> }, // Seller promotions
      { path: "reports", element: <SellerReports /> }, // Seller reports
      { path: "paymentsetup", element: <SellerPaymentSetup /> }, // Payment setup for seller
      { path: "couriersetup", element: <SellerCourierSetup /> }, // Courier setup
    ],
  },
]);
