import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // Add coupon logic here
  };
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    // If there's history, go back, otherwise fallback to /collection
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/collection");
    }
  };

  return (
    <section className="mt-5 sm:mt-0 px-4 sm:px-6 lg:px-12 py-10 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Side - Cart Info */}
          <div className="flex-1 bg-white px-4 py-6">
            <h1 className="text-3xl font-bold uppercase mb-3">Your Cart</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Not ready to checkout?{" "}
              <span
                className="text-blue-300 cursor-pointer hover:underline"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </span>
            </p>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full lg:w-1/3 px-6 py-8">
            <h2 className="text-xl font-semibold mb-6 text-center lg:text-left">
              Order Summary
            </h2>

            <dl className="space-y-4 text-sm text-gray-700 mb-6">
              <div className="flex justify-between border-b pb-2">
                <dt>Subtotal</dt>
                <dd className="font-medium">₱0.00</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt>Shipping Fee</dt>
                <dd className="font-medium">₱0.00</dd>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <dt>Total</dt>
                <dd>₱0.00</dd>
              </div>
            </dl>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter coupon code here"
                className="border border-gray-300 px-4 py-3 outline-none w-full"
              />
              <button
                type="submit"
                className="bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart fontSize="small" />
                Continue to checkout
              </button>
            </form>
            <div className="mt-4 text-center lg:text-left">
              <p className="text-sm text-grey-600 hover:underline cursor-pointer inline-flex items-center gap-1 transition" onClick={handleContinueShopping}>
                <ArrowBack fontSize="small" />
                Back to Shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
