// Import necessary components and hooks
import { Link } from "react-router-dom"; // For navigation links
import OrderSummary from "../components/OrderSummary"; // Component showing cart summary and totals
import { useFetchBasketQuery } from "../features/basket/basketApi"; // RTK Query hook for fetching basket
import BasketItem from "../features/basket/BasketItem"; // Component rendering individual basket items

export default function Cart() {
  // Fetch basket data from API
  const { data, isLoading } = useFetchBasketQuery();

  // Display loading state while fetching
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading basket...
      </div>
    );

  // Display empty cart message if no items
  if (!data || data.items.length === 0)
    return (
      <section className="mt-5 sm:mt-0 px-4 sm:px-6 lg:px-12 py-10 w-full">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-3xl font-bold uppercase mb-3">
            Your cart is empty
          </p>
        </div>
      </section>
    );

  return (
    <section className="mt-5 sm:mt-0 px-4 sm:px-6 lg:px-12 py-10 w-full">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold uppercase mb-3">Your Cart</h1>

        {/* Continue shopping link */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Not ready to checkout?{" "}
          <Link to="/collection">
            <span className="text-blue-300 cursor-pointer hover:underline">
              Continue Shopping
            </span>
          </Link>
        </p>

        {/* Main content: Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left side: List of basket items */}
          <div className="w-full">
            {data.items.map((item) => (
              <BasketItem item={item} key={item.productId} />
            ))}
          </div>

          {/* Right side: Order summary */}
          <div className="w-full lg:w-1/2 px-6">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
