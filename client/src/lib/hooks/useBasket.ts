import type { Item } from "../../app/models/basket";
import { useClearBasketMutation, useFetchBasketQuery } from "../../features/basket/basketApi";

/**
 * Custom hook for managing the user's shopping basket.
 * Provides basket data, calculated totals, and a function to clear the basket.
 */
export const useBasket = () => {
  // Fetch the current basket from the backend API using RTK Query
  const { data: basket } = useFetchBasketQuery();

  // Hook to trigger clearing the basket via the backend API
  const [clearBasket] = useClearBasketMutation();

  // Calculate the subtotal: sum of (quantity * price) for all items in the basket
  const subtotal = basket?.items.reduce(
    (sum: number, item: Item) => sum + item.quantity * item.price,
    0
  ) ?? 0;

  // Calculate delivery fee: free if subtotal > 10000, otherwise 500
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  // Calculate total amount to be paid: subtotal + deliveryFee
  const total = subtotal + deliveryFee;

  // Return basket data and computed values along with clearBasket function
  return {
    basket,        // Basket object containing items
    subtotal,      // Total price of items before delivery
    deliveryFee,   // Delivery charge based on subtotal
    total,         // Total amount (subtotal + delivery fee)
    clearBasket,   // Function to clear the basket
  };
};
