import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../features/home/Home";
import ProductDetails from "../../features/catalog/ProductDetails";
import ProductList from "../../features/catalog/ProductList";
import AboutPage from "../../features/about/AboutPage";
import NewItems from "../../pages/NewItems";
import Best from "../../components/Best";
import BestSeller from "../../pages/BestSeller";
import Collection from "../../pages/Collection";
import Cart from "../../pages/Cart";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/orders/OrdersPage";
import OrderDetailedPage from "../../features/orders/OrderDetailedPage";
import InventoryPage from "../../features/admin/InventoryPage";
import SellerApp from "../../features/seller/SellerApp";
import SellerDashboard from "../../features/seller/sellercomponents/SellerDashboard";
import SellerProduct from "../../features/seller/sellercomponents/sellerproducts/SellerProduct";
import SellerSalesOrder from "../../features/seller/sellercomponents/sellersalesorder/SellerSalesOrder";
import SellerPromotions from "../../features/seller/sellercomponents/SellerPromotions";
import SellerReports from "../../features/seller/sellercomponents/SellerReports";
import SellerPaymentSetup from "../../features/seller/sellercomponents/SellerPaymentSetup";
import SellerCourierSetup from "../../features/seller/sellercomponents/SellerCourierSetup";
import SellerSalesCustomer from "../../features/seller/sellercomponents/sellersalesorder/SellerSalesCustomer";
import SellerProductCategory from "../../features/seller/sellercomponents/sellerproducts/SellerProductCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />, children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/success", element: <CheckoutSuccess /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrderDetailedPage /> },
          { path: "inventory", element: <InventoryPage /> },
        ]
      },
      { path: "/", element: <HomePage /> },
      { path: "new", element: <NewItems /> },
      { path: "best", element: <Best /> },
      { path: "bestseller", element: <BestSeller /> },
      { path: "collection", element: <Collection /> },
      { path: "aboutpage", element: <AboutPage /> },
      { path: "contactpage", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "productlist", element: <ProductList products={[]} cardWidth={""} /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/*", element: <Navigate replace to="/not-found" /> },
    ],
  },
  {
    path: "/seller",
    element: <SellerApp />,
    children: [
      { index: true, element: <SellerDashboard /> },  // this will render at "/seller"
      { path: "dashboard", element: <SellerDashboard /> },
      { path: "products", element: <SellerProduct /> },
      { path: "productcategory", element: <SellerProductCategory /> },
      { path: "salesorder", element: <SellerSalesOrder /> },
      { path: "salescustomer", element: <SellerSalesCustomer /> },
      { path: "promotions", element: <SellerPromotions /> },
      { path: "reports", element: <SellerReports /> },
      { path: "paymentsetup", element: <SellerPaymentSetup /> },
      { path: "couriersetup", element: <SellerCourierSetup /> },
    ],
  }

]);
