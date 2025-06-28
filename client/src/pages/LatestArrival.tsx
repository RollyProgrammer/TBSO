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
    <div className="px-4">
      <h1 className="text-center text-3xl uppercase font-bold mb-10">
        Products
      </h1>
      <ProductList products={products}/>
    </div>
  );
}
