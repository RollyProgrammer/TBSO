import type { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useAddbasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../lib/util";
import { AddShoppingCart } from "@mui/icons-material";
import { Eye } from "lucide-react";

type Props = {
  product: Product;
  cardWidth: string;
};

export default function ProductCard({ product, cardWidth }: Props) {
  const [addBasketItem, { isLoading }] = useAddbasketItemMutation();

  return (
    <div className={`${cardWidth} shadow-md flex flex-col justify-between bg-white`}>
      {/* Image */}

      <Link to={`/catalog/${product.id}`}>
        <div className={`w-full overflow-hidden ${cardWidth}`}>
          <img src={product.pictureUrl} alt={product.name} title={product.name} className={`w-full object-cover ${cardWidth.replace("w-", "h-")}`} />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase mb-1">{product.name}</h2>
        <p className="text-lg font-bold text-gray-600">{currencyFormat(product.price)}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 px-4 pb-4">
        <button
          disabled={isLoading}
          onClick={() => addBasketItem({ product, quantity: 1 })}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition disabled:opacity-50"
        >
          {isLoading ? "Adding..." : <>{cardWidth === "w-45" ? <AddShoppingCart /> : "Add to Cart"}</>}
        </button>

        <Link
          to={`/catalog/${product.id}`}
          className="w-full sm:w-auto flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-600 text-gray-600 hover:bg-gray-50 transition"
        >
          {cardWidth === "w-45" ? <Eye fontSize="inherit" /> : "View"}
        </Link>
      </div>
    </div>
  );
}
