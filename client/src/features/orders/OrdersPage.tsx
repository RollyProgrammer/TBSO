// Hook to fetch orders from the API
import { useFetchOrdersQuery } from "./orderApi";

// React Router hook for navigation
import { useNavigate } from "react-router-dom";

// Utility to format dates
import { format } from "date-fns";

// Utility to format currency values
import { currencyFormat } from "../../lib/util";

export default function OrdersPage() {
  // Fetch orders and loading state from the API
  const { data: orders, isLoading } = useFetchOrdersQuery();

  // Hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Show loading message while fetching data
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Orders Page...</div>;
  }

  // Show message if there are no orders
  if (!orders || orders.length === 0) {
    return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">No orders available</div>;
  }

  return (
    <section className="py-15 sm:py-6">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

        {/* Table container with border and shadow */}
        <div className="overflow-hidden shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Order No.</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Customer Name</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {/* Loop through each order and render a row */}
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)} // Navigate to order details on row click
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 text-center font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">User Name</td> {/* Placeholder name */}
                  <td className="px-6 py-4 text-center font-medium text-gray-700">{format(new Date(order.orderDate), "dd-MMM-yyyy")}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900">{currencyFormat(order.total)}</td>
                  <td className="px-6 py-4 text-center font-medium">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold ${
                        order.orderStatus === "Completed" ? "bg-green-100 text-green-700" : order.orderStatus === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
