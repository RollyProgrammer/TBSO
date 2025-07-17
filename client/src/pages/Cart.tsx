import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import BasketItem from "../features/basket/BasketItem";

export default function Cart() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading basket...
      </div>
    );

  if (!data || data.items.length == 0)
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
        <h1 className="text-3xl font-bold uppercase mb-3">Your Cart</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Not ready to checkout?{" "}
          <Link to="/collection">
            <span className="text-blue-300 cursor-pointer hover:underline">
              Continue Shopping
            </span>
          </Link>
        </p>

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Orders */}
          <div className="w-full">
            {data.items.map((item) => (
              <BasketItem item={item} key={item.productId} />
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="w-full lg:w-1/2 px-6">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
