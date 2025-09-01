import { Link, useParams } from "react-router-dom";
import { useFetchOrderDetailedQuery } from "./orderApi";
import { format } from "date-fns";
import { currencyFormat, formatAddressString, formatPaymentString } from "../../lib/util";

export default function OrderDetailedPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useFetchOrderDetailedQuery(+id!);
  
  const formatOrderStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return "Pending";
      case "PaymentReceived":
        return "Payment Received";
      case "PaymentFailed":
        return "Payment Failed";
      case "PaymentMismatch":
        return "Payment Mismatch";
      default:
        return status;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Orders Page...</div>;
  }

  if (!order) return <div className="text-center text-xl font-semibold py-8">Order not found</div>;

  return (
    <section className="py-15 sm:py-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Summary for #{order.id}</h2>
          <Link to="/orders" className="px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-100 transition">
            Back to orders
          </Link>
        </div>

        <hr className="my-4" />

        {/* Billing + Delivery */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Billing and delivery information</h3>

          <dl>
            <dt className="font-medium text-gray-700">Shipping address:</dt>
            <dd className="text-gray-600">{formatAddressString(order.shippingAddress)}</dd>
          </dl>

          <dl>
            <dt className="font-medium text-gray-700">Payment information:</dt>
            <dd className="text-gray-600">{formatPaymentString(order.paymentSummary)}</dd>
          </dl>
        </div>

        <hr className="my-4" />

        {/* Order Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Order details</h3>

          <dl>
            <dt className="font-medium text-gray-700">Email address:</dt>
            <dd className="text-gray-600">{order.buyerEmail}</dd>
          </dl>

          <dl>
            <dt className="font-medium text-gray-700">Order Status:</dt>
            <dd className="text-gray-600">{formatOrderStatus(order.orderStatus)}</dd>
          </dl>

          <dl>
            <dt className="font-medium text-gray-700">Order Date:</dt>
            <dd className="text-gray-600">{format(new Date(order.orderDate), "dd MMM yyyy")}</dd>
          </dl>
        </div>

        <hr className="my-4" />

        {/* Items Table */}
        <div className="overflow-hidden border-y border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-100 bg-white">
              {order.orderItems.map((item) => (
                <tr key={item.productId} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.pictureUrl} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">x {item.quantity}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{currencyFormat(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Subtotal</span>
            <span>{currencyFormat(order.subtotal)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Discount</span>
            <span className="text-green-600">{currencyFormat(order.discount)}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Delivery Fee</span>
            <span>{currencyFormat(order.deliveryFee)}</span>
          </div>

          <div className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-2">
            <span>Total</span>
            <span>{currencyFormat(order.total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
