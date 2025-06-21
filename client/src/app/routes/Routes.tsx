import { createBrowserRouter } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../features/home/HomePage";
import BestSeller from "../../features/pages/BestSeller";
import NewItems from "../../features/pages/NewItems";
import SignUp from "../../features/pages/SignUp";
import Login from "../../features/pages/Login";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Collection from "../../features/pages/Collection";
import Explore from "../../features/pages/Explore";
import ProductCard from "../../features/catalog/ProductCard";
import ProductList from "../../features/catalog/ProductList";
import Best from "../../components/Best";
import AboutPage from "../../features/about/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "new", element: <NewItems /> },
      { path: "best", element: <Best /> },
      { path: "bestseller", element: <BestSeller /> },
      { path: "collection", element: <Collection /> },
      { path: "explore", element: <Explore /> },
      { path: "aboutpage", element: <AboutPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "productlist", element: <ProductList products={[]} /> },
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
