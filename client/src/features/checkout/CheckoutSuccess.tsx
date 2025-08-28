import { Link, useLocation } from "react-router-dom";
import type { Order } from "../../app/models/order";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state.data as Order;

  if (!order) return <p className="text-gray-600">Problem accessing the order</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Thanks for your order!</h1>
      <p className="text-gray-600 mb-6">
        Your order <strong>#{order.id}</strong> will be processed.
      </p>

      <div className="bg-white shadow  p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order Date</span>
          <span className="font-medium">{order.orderDate}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Payment Method</span>
          <span className="font-medium">{formatPaymentString(order.paymentSummary)}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping Address</span>
          <span className="font-medium">{formatAddressString(order.shippingAddress)}</span>
        </div>
        <hr />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Amount</span>
          <span className="font-medium">{currencyFormat(order?.total)}</span>
        </div>
      </div>

      <div className="flex justify-start gap-3">
        <Link to={`/orders/${order.id}`} className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-700 transition">
          View your order
        </Link>

        <Link to="/catalog" className="px-4 py-2 border border-gray-400 text-gray-700 font-medium hover:bg-gray-100 transition">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
