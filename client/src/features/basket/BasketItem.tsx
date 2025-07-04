import { useEffect, useState } from "react";
import type { Item } from "../../app/models/basket";
import {
  useAddbasketItemMutation,
  useRemoveBasketItemMutation,
} from "./basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  item: Item;
};

export default function BasketItem({ item }: Props) {
  const [inputQuantity, setInputQuantity] = useState(item.quantity);
  const [addBasketItem] = useAddbasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();

  useEffect(() => setInputQuantity(item.quantity), [item.quantity]);

  const handleBlur = () => {
    const diff = inputQuantity - item.quantity;
    if (diff > 0) {
      addBasketItem({ product: item, quantity: diff });
    } else if (diff < 0) {
      removeBasketItem({ productId: item.productId, quantity: -diff });
    }
  };

  return (
    <div className="flex w-full p-2 border-b border-gray-300 relative">
      {/* Image */}
      <img
        src={item.pictureUrl}
        alt={item.name}
        className="w-32 h-32 sm:w-30 sm:h-30 object-cover"
      />

      {/* Text Content */}
      <div className="ml-4 flex flex-col flex-1">
        {/* Item Name */}
        <h2 className="text-base sm:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
          {item.name}
        </h2>

        {/* Quantity and Vendor Row */}
        <div className="flex justify-between text-gray-600">
          <p className="text-base">
            <span className="text-base mr-2">Quantity:</span>
            {/* Quantity Input */}
            <input
              type="number"
              className="w-12 text-center border rounded text-sm focus:ring-1 focus:ring-blue-400"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(parseInt(e.target.value) || 0)}
              onBlur={handleBlur}
            />
          </p>
        </div>
        <div className="flex justify-between text-gray-600">
          <p className="text-base">Price: {currencyFormat(item.price)}</p>
        </div>

        {/* Bottom: Price and Remove */}
        <div className="flex justify-between items-end mt-auto">
          <p className="text-lg sm:text-2xl font-bold text-gray-700">
            {currencyFormat(item.price * item.quantity)}
          </p>
          <button
            onClick={() =>
              removeBasketItem({
                productId: item.productId,
                quantity: item.quantity,
              })
            }
            className="text-red-500 hover:font-semibold sm:hover:font-semibold flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto gap-1"
          >
            {/* Text for medium and up */}
            <span className="hidden sm:inline">Remove</span>

            {/* Icon for small screens */}
            <span className="inline-flex sm:hidden items-center justify-center text-base leading-none w-full h-full">
              ❌
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
