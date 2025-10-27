// import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import Review from "./Review";
// import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
// import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
// import { useBasket } from "../../lib/hooks/useBasket";
// import { currencyFormat } from "../../lib/util";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useCreateOrderMutation } from "../orders/orderApi";

// const steps = ["Address", "Payment", "Review"];

// export default function CheckoutStepper() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [createOrder] = useCreateOrderMutation();
//   const { basket } = useBasket();
//   const { data, isLoading } = useFetchAddressQuery();
//   const [updateAddress] = useUpdateUserAddressMutation();
//   const [saveAddressChecked, setSaveAddressChecked] = useState(false);
//   const elements = useElements();
//   const stripe = useStripe();
//   const [addressComplete, setAddressComplete] = useState(false);
//   const [paymentComplete, setPaymentComplete] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const { total, clearBasket } = useBasket();
//   const navigate = useNavigate();
//   const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);

//   let name, restAddress;
//   if (data) {
//     ({ name, ...restAddress } = data);
//   }

//   const handleNext = async () => {
//     if (activeStep === 0 && saveAddressChecked && elements) {
//       const address = await getStripeAddress();
//       if (address) await updateAddress(address);
//     }
//     if (activeStep === 1) {
//       if (!elements || !stripe) return;
//       const result = await elements.submit();
//       if (result.error) return toast.error(result.error.message);

//       const stripeResult = await stripe.createConfirmationToken({ elements });
//       if (stripeResult.error) return toast.error(stripeResult.error.message);
//       setConfirmationToken(stripeResult.confirmationToken);
//     }
//     if (activeStep === 2) {
//       await confirmPayment();
//     }
//     if (activeStep < 2) setActiveStep((step) => step + 1);
//   };

//   const confirmPayment = async () => {
//     setSubmitting(true);
//     try {
//       if (!confirmationToken || !basket?.clientSecret) throw new Error("Unable to process payment");

//       const orderModel = await createOrderModel();
//       const orderResult = await createOrder(orderModel);

//       const paymentResult = await stripe?.confirmPayment({
//         clientSecret: basket.clientSecret,
//         redirect: "if_required",
//         confirmParams: {
//           confirmation_token: confirmationToken.id,
//         },
//       });

//       if (paymentResult?.paymentIntent?.status === "succeeded") {
//         navigate("/checkout/success", { state: orderResult });
//         clearBasket();
//       } else if (paymentResult?.error) {
//         throw new Error(paymentResult.error.message);
//       } else {
//         throw new Error("Something went wrong");
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         toast.error(error.message);
//       }
//       setActiveStep((step) => step - 1);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const createOrderModel = async () => {
//     const shippingAddress = await getStripeAddress();
//     const paymentSummary = confirmationToken?.payment_method_preview.card;

//     if (!shippingAddress || !paymentSummary) throw new Error("Problem creating order");

//     return { shippingAddress, paymentSummary };
//   };

//   const getStripeAddress = async () => {
//     const addressElement = elements?.getElement("address");
//     if (!addressElement) return null;
//     const {
//       value: { name, address },
//     } = await addressElement.getValue();

//     if (name && address) return { ...address, name };

//     return null;
//   };

//   const handleBack = () => {
//     setActiveStep((step) => step - 1);
//   };

//   const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
//     setAddressComplete(event.complete);
//   };

//   const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
//     setPaymentComplete(event.complete);
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Checkout...</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full">
//       {/* Stepper */}
//       <div className="flex justify-center items-center mb-6">
// {steps.map((label, index) => (
//   <div key={index} className="flex items-center text-center">
//     <p className={`text-l ${index <= activeStep ? "font-bold" : "font-normal"}`}>{label}</p>
//     {index < steps.length - 1 && <div className="h-0.5 w-60 bg-gray-300 mx-2" />}
//   </div>
// ))}
//       </div>

//       <div className="mt-2">
//         {/* Step 0: Address Form */}
//         <div className={activeStep === 0 ? "block" : "hidden"}>
//           <AddressElement
//             options={{
//               mode: "shipping",
//               defaultValues: {
//                 name: name,
//                 address: restAddress,
//               },
//             }}
//             onChange={handleAddressChange}
//           />
//           <div className="flex justify-end mt-4">
//             <label className="inline-flex items-center space-x-2">
//               <input type="checkbox" checked={saveAddressChecked} onChange={(e) => setSaveAddressChecked(e.target.checked)} className="form-checkbox h-4 w-4 text-blue-600" />
//               <span className="text-sm text-gray-700">Save as default address</span>
//             </label>
//           </div>
//         </div>

        // {/* Step 1: Payment Element */}
        // <div className={activeStep === 1 ? "block" : "hidden"}>
        //   <PaymentElement
        //     onChange={handlePaymentChange}
        //     options={{
        //       wallets: {
        //         applePay: "never",
        //         googlePay: "never",
        //       },
        //     }}
        //   />
        // </div>

//         {/* Step 2: Review */}
//         <div className={activeStep === 2 ? "block" : "hidden"}>
//           <Review confirmationToken={confirmationToken} />
//         </div>
//       </div>

// <div className="flex justify-between pt-2">
//   {/* Back Button */}
//   <button
//     onClick={handleBack}
//     disabled={activeStep === 0}
//     className={`px-4 py-2 text-sm font-medium transition
// ${activeStep === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
//   >
//     Back
//   </button>

//   {/* Next / Pay Button */}
//   <button
//     onClick={handleNext}
//     disabled={(activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete) || submitting}
//     className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2
// ${(activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete) || submitting ? "bg-gray-300 text-white cursor-not-allowed" : "bg-gray-900 text-white hover:bg-gray-700"}`}
//   >
//     {submitting && (
//       <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
//       </svg>
//     )}
//     {activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : "Next"}
//   </button>
// </div>
//     </div>
//   );
// }

import { useState } from "react";
import type { PaymentData } from "./payment/payment";
import ReviewForm from "./ReviewForm";
import type { ShippingAddress, PaymentSummary } from "../../app/models/order";
import AddressForm from "./address/AddressForm";
import PaymentForm from "./payment/PaymentForm";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<{
    address?: ShippingAddress;
    payment?: PaymentData;
  }>({});

  const handleNext = (data?: Partial<typeof formData>) => {
    if (data) setFormData((prev) => ({ ...prev, ...data }));
    if (activeStep < steps.length - 1) setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((step) => step - 1);
  };

  /** Map form data to PayMongo-compatible types */
  const shippingAddress: ShippingAddress | undefined = formData.address && {
    name: formData.address.name || "",
    line1: formData.address.line1 || "",
    line2: formData.address.line2 || null,
    city: formData.address.city || "",
    state: formData.address.state || "",
    postal_code: formData.address.postal_code || "",
    country: formData.address.country || "",
  };

  const paymentSummary: PaymentSummary | undefined = formData.payment && {
    brand: formData.payment.cardBrand || "N/A",
    last4: formData.payment.cardNumber?.slice(-4) || "0000",
    exp_month: Number(formData.payment.expMonth || formData.payment.month || 0),
    exp_year: Number(formData.payment.expYear || formData.payment.year || 0),
  };

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
      <div className="mt-2">
        {activeStep === 0 && <AddressForm onNext={(data) => handleNext({ address: data })} />}
        {activeStep === 1 && <PaymentForm onBack={handleBack} onNext={(data) => handleNext({ payment: data })} />}
        {activeStep === 2 && <ReviewForm shippingAddress={shippingAddress} paymentSummary={paymentSummary} onBack={handleBack} />}
      </div>
    </div>
  );
}
