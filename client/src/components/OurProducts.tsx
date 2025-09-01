import { Link } from "react-router-dom";
import { useFetchProductsQuery } from "../features/catalog/catalogApi";
import ProductList from "../features/catalog/ProductList";
import { useAppSelector } from "../app/store/store";
import { useEffect, useState } from "react";

export default function OurProducts() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading, error } = useFetchProductsQuery({
    ...productParams,
    pageSize: 12,
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
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center mb-8">
        <Link to="/catalog">
          <button className="border-2 border-black text-black font-bold px-6 sm:px-10 py-2 hover:bg-black hover:text-white transition">SEE ALL</button>
        </Link>
      </div>

      {/* Product List */}
      <div className="w-full mx-auto">
        <ProductList products={products.slice(0, 12)} cardWidth={cardWidth} />
      </div>
    </section>
  );
}
