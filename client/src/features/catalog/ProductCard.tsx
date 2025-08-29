import type { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useAddbasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddbasketItemMutation();

  return (
    <div className="w-70 shadow-md flex flex-col justify-between bg-white">
      {/* Image */}
      <Link to={`/catalog/${product.id}`} className="block">
        <div className="h-60 bg-cover bg-center hover:opacity-90 transition" style={{ backgroundImage: `url(${product.pictureUrl})` }} title={product.name} />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase mb-1">{product.name}</h2>
        <p className="text-lg font-bold text-gray-600">{currencyFormat(product.price)}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between px-4 pb-4">
        <button disabled={isLoading} onClick={() => addBasketItem({ product, quantity: 1 })} className="px-3 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition">
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>

        <Link to={`/catalog/${product.id}`} className="px-3 py-2 text-sm font-medium border border-gray-600 text-gray-600 hover:bg-gray-50 transition">
          View
        </Link>
      </div>
    </div>
  );
}
