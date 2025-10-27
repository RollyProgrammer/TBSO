import { currencyFormat } from "../../lib/util";
import { useBasket } from "../../lib/hooks/useBasket";
import type { PaymentSummary, ShippingAddress } from "../../app/models/order";

interface ReviewFormProps {
  shippingAddress?: ShippingAddress;
  paymentSummary?: PaymentSummary;
  onBack: () => void;
  onPlaceOrder?: () => void;
}

export default function ReviewForm({ shippingAddress, paymentSummary, onBack, onPlaceOrder }: ReviewFormProps) {
  const { basket } = useBasket();

  const addressString = () => {
    if (!shippingAddress) return "";
    const { name, line1, line2, city, state, postal_code, country } = shippingAddress;
    return `${name}, ${line1}${line2 ? `, ${line2}` : ""}, ${city}, ${state}, ${postal_code}, ${country}`;
  };

  const paymentString = () => {
    if (!paymentSummary) return "";
    const { brand, last4, exp_month, exp_year } = paymentSummary;
    return `${brand.toUpperCase()}, **** **** **** ${last4}, Exp: ${exp_month}/${exp_year}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

      {shippingAddress && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>{addressString()}</p>
        </div>
      )}

      {paymentSummary && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p>{paymentString()}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Items</h3>
        <div className="border rounded overflow-hidden">
          {basket?.items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center p-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <img src={item.pictureUrl} alt={item.name} className="w-12 h-12 object-cover" />
                <span>{item.name}</span>
              </div>
              <span>x {item.quantity}</span>
              <span>{currencyFormat(item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Back
        </button>
        <button onClick={onPlaceOrder ? onPlaceOrder : () => alert("Placing order...")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Place Order
        </button>
      </div>
    </div>
  );
}
