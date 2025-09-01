import { useEffect, useState } from "react";
import ProductList from "../features/catalog/ProductList";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/store/store";
import { useFetchProductsQuery } from "../features/catalog/catalogApi";

export default function Best() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading, error } = useFetchProductsQuery({
    ...productParams,
    pageSize: 3,
  });

  const products = data?.items || [];

  const [cardWidth, setCardWidth] = useState("w-70");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50");
      } else {
        setCardWidth("w-70");
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Best Sellers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>

      <div className="text-center mb-8">
        <Link to="/bestseller">
          <button className="border-2 border-black text-black font-bold px-6 sm:px-10 py-2 hover:bg-black hover:text-white transition">SEE ALL</button>
        </Link>
      </div>

      <div className="w-full mx-auto">
        <ProductList products={products.slice(0, 3)} cardWidth={cardWidth} />
      </div>
    </section>
  );
}
