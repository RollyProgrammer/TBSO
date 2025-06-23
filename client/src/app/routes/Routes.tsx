import { createBrowserRouter } from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "new", element: <NewItems /> },
      { path: "best", element: <Best /> },
      { path: "bestseller", element: <BestSeller /> },
      { path: "latestarrival", element: <LatestArrival /> },
      { path: "products", element: <Products /> },
      { path: "collection", element: <Collection /> },
      { path: "explore", element: <Explore /> },
      { path: "aboutpage", element: <AboutPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "productlist", element: <ProductList products={[]} /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

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
