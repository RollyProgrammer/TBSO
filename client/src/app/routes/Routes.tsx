import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../features/home/Home";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ProductCard from "../../features/catalog/ProductCard";
import ProductList from "../../features/catalog/ProductList";
import AboutPage from "../../features/about/AboutPage";
import NewItems from "../../pages/NewItems";
import LatestArrival from "../../pages/LatestArrival";
import Best from "../../components/Best";
import BestSeller from "../../pages/BestSeller";
import Products from "../../pages/Products";
import Collection from "../../pages/Collection";
import Explore from "../../pages/Explore";
import Cart from "../../pages/Cart";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth />, children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/success", element: <CheckoutSuccess /> },
      ]},
      { path: "", element: <HomePage /> },
      { path: "new", element: <NewItems /> },
      { path: "best", element: <Best /> },
      { path: "bestseller", element: <BestSeller /> },
      { path: "latestarrival", element: <LatestArrival /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "collection", element: <Collection /> },
      { path: "explore", element: <Explore /> },
      { path: "aboutpage", element: <AboutPage /> },
      { path: "contactpage", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "catalog", element: <Catalog /> },
      // { path: "catalog/:id", element: <ProductDetails /> },
      { path: "catalog/:id", element: <Products /> },
      { path: "productlist", element: <ProductList products={[]} /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/*", element: <Navigate replace to="/not-found" /> },

      // Example route for demo ProductCard (optional)
      {
        path: "productcard-demo",
        element: (
          <ProductCard
            product={{
              id: 0,
              name: "Sample",
              description: "Sample description",
              price: 100,
              pictureUrl: "https://via.placeholder.com/150",
              type: "Type A",
              brand: "Brand X",
              quantityInStock: 10,
            }}
          />
        ),
      },
    ],
  },
]);
