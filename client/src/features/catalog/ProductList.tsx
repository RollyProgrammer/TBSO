import type { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  cardWidth: string; // <-- already added
};

export default function ProductList({ products, cardWidth }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} cardWidth={cardWidth} />
      ))}
    </div>
  );
}
