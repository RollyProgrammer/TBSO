import { useEffect, useState } from "react";
import type { Product } from "../app/models/product";
import ProductList from "../features/catalog/ProductList";

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-15 sm:py-5 w-full">
      <div className="text-center mb-5 sm:mb-10 ">
        <h1 className="text-2xl sm:text-3xl uppercase font-bold">
          Best Sellers
        </h1>
      </div>
       <div className="w-full mx-auto">
        <ProductList products={products} />
      </div>
    </section>
  );
}
