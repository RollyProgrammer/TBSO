import { useEffect, useState } from "react";
import ProductList from "../features/catalog/ProductList";
import { Link } from "react-router-dom";
import { useFetchNewestProductsQuery } from "../features/catalog/catalogApi";
import { useAppSelector } from "../app/store/store";

export default function LatestArrival() {
  // ✅ pull product params from redux slice
  const productParams = useAppSelector((state) => state.catalog);

  // ✅ fetch newest products using params from slice
  const { data, isLoading, error } = useFetchNewestProductsQuery({
    ...productParams,
    pageSize: 5, // override just for latest arrivals
  });

  const products = data?.items || [];

  // cardWidth state lifted here
  const [cardWidth, setCardWidth] = useState("w-70");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50"); // default for phones
      } else {
        setCardWidth("w-70"); // default for sm and up
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Latest Arrival</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      <div className="text-center mb-8">
        <Link to="/new">
          <button className="border-2 border-black text-black font-bold px-10 py-2 hover:bg-black hover:text-white transition duration-300">SEE ALL</button>
        </Link>
      </div>

      <div className="w-full mx-auto">
        <ProductList products={products.slice(0, 5)} cardWidth={cardWidth} />
      </div>
    </div>
  );
}
