import { useEffect, useState } from "react";
import type { Product } from "../app/models/product";
import ProductList from "../features/catalog/ProductList";
import { Link } from "react-router-dom";

export default function Best() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Best Sellers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </p>
      </div>

      <div className="text-center mb-8">
        <Link to="/bestseller">
          <button className="border-2 border-black text-black font-bold px-6 sm:px-10 py-2 hover:bg-black hover:text-white transition">
            SEE ALL
          </button>
        </Link>
      </div>

      <div className="w-full mx-auto">
        <ProductList products={products.slice(0, 3)} />
      </div>
    </section>
  );
}
