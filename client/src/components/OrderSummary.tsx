import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { currencyFormat } from "../lib/util";
import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../lib/hooks/useBasket";

export default function OrderSummary() {
  const {subtotal, deliveryFee} = useBasket();
  const location = useLocation();

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-center lg:text-left">Order Summary</h2>

      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Enter coupon code here" className="border border-gray-300 px-4 py-3 outline-none w-full" />
        <dl className="space-y-4 text-sm text-gray-700 mb-6">
          <div className="flex justify-between border-b pb-2">
            <dt>Subtotal</dt>
            <dd className="font-medium">{currencyFormat(subtotal)}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt>Discount</dt>
            <dd className="font-medium">-</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt>Shipping Fee</dt>
            <dd className="font-medium">{currencyFormat(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <dt>Total</dt>
            <dd></dd>
          </div>
        </dl>

        {!location.pathname.includes("checkout") && (
          <Link to="/checkout" type="submit" className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition w-full flex items-center justify-center gap-2">
            <ShoppingCart fontSize="small" />
            Continue to checkout
          </Link>
        )}
      </form>

      <div className="mt-4 text-center lg:text-left">
        <Link to="/catalog" className="text-sm text-gray-600 hover:underline cursor-pointer inline-flex items-center gap-1 transition">
          <p className="text-sm text-gray-600 hover:underline cursor-pointer inline-flex items-center gap-1 transition">
            <ArrowBack fontSize="small" />
            Back to Shopping
          </p>
        </Link>
      </div>
    </div>
  );
}
