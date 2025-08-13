import { Checkbox, Typography, Box, FormControlLabel, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../orders/orderApi";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [createOrder] = useCreateOrderMutation();
  const { basket } = useBasket();
  const { data, isLoading } = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { total, clearBasket } = useBasket();
  const navigate = useNavigate();
  const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);

  let name, restAddress;
  if (data) {
    ({ name, ...restAddress } = data);
  }

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    if (activeStep === 2) {
      await confirmPayment();
    }
    if (activeStep < 2) setActiveStep((step) => step + 1);
  };

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      if (!confirmationToken || !basket?.clientSecret) throw new Error("Unable to process payment");

      const orderModel = await createOrderModel();
      const orderResult = await createOrder(orderModel);

      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id,
        },
      });

      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success", { state: orderResult });
        clearBasket();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep((step) => step - 1);
    } finally {
      setSubmitting(false);
    }
  };

  const createOrderModel = async () => {
    const shippingAddress = await getStripeAddress();
    const paymentSummary = confirmationToken?.payment_method_preview.card;

    if (!shippingAddress || !paymentSummary) throw new Error("Problem creating order");

    return { shippingAddress, paymentSummary };
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();

    if (name && address) return { ...address, name };

    return null;
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  };

  if (isLoading) return <Typography variant="h6">Loading checkout...</Typography>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* Stepper */}
      <div className="flex justify-center items-center mb-6">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center text-center">
            <p className={`text-l ${index <= activeStep ? "font-bold" : "font-normal"}`}>{label}</p>
            {index < steps.length - 1 && <div className="h-0.5 w-60 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {/* <div className="text-center mb-6">
        <p className="text-lg font-medium">
          {activeStep === 0 && "Address step"}
          {activeStep === 1 && "Payment step"}
          {activeStep === 2 && "Review step"}
        </p>
      </div> */}

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <AddressElement
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              },
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={<Checkbox checked={saveAddressChecked} onChange={(e) => setSaveAddressChecked(e.target.checked)} />}
            label="Save as default address"
          />
        </Box>

        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement
            onChange={handlePaymentChange}
            options={{
              wallets: {
                applePay: "never",
                googlePay: "never",
              },
            }}
          />
        </Box>

        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      {/* Buttons */}
      <div className="flex justify-between pt-2">
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>

        <LoadingButton onClick={handleNext} disabled={(activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete) || submitting} loading={submitting}>
          {activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : "Next"}
        </LoadingButton>
      </div>
    </div>
  );
}
