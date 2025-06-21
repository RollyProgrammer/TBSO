import { useEffect, useState } from "react";
import type { Product } from "../app/models/product";
import ProductList from "../features/catalog/ProductList";

export default function LatestArrival() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Latest Arrival</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="text-center mb-8">
        <button className="border-2 border-black text-black font-bold px-10 py-2 hover:bg-black hover:text-white transition duration-300">
          SEE ALL
        </button>
      </div>
      
      <div>
        <ProductList products={products.slice(0, 5)} />
      </div>
    </div>
  );
}
