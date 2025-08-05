import OrderSummary from "../../components/OrderSummary";
import { useFetchBasketQuery } from "../basket/basketApi";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useRef } from "react";
import { Typography } from "@mui/material";
import { useCreatePaymentIntentMutation } from "./checkoutApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const created = useRef(false);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
    };
  }, [basket?.clientSecret]);

  return (
    <section className="mt-5 sm:mt-0 px-4 sm:px-6 lg:px-12 py-10 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full">
            {!stripePromise || !options || isLoading ? (
              <Typography variant="h6">Loading checkout...</Typography>
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutStepper />
              </Elements>
            )}
          </div>

          <div className="w-full lg:w-1/2 px-6">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
