import { CreditCardIcon, WalletIcon, BanknoteIcon, Clock } from "lucide-react";
import { useState } from "react";
import type { PaymentData, PaymentOption, PaymentOptionDetail } from "./payment";

interface PaymentFormProps {
  onBack: () => void;
  onNext: (data: PaymentData) => void;
}

const paymentMethods: PaymentOption[] = [
  {
    method: "Credit or Debit Card",
    icon: <CreditCardIcon className="w-5 h-5 text-gray-500" />,
    options: [{ label: "Visa or Mastercard", icon: <img src="/src/assets/visa.png" alt="Visa/Mastercard" className="w-6 h-6 rounded" /> }],
  },
  {
    method: "E-Wallets",
    icon: <WalletIcon className="w-5 h-5 text-gray-500" />,
    options: [
      { label: "GCash", icon: <img src="/src/assets/gcash.png" alt="GCash" className="w-6 h-6 rounded" /> },
      { label: "GrabPay", icon: <img src="/src/assets/grab_pay.svg" alt="GrabPay" className="w-6 h-6 rounded" /> },
      { label: "Maya", icon: <img src="/src/assets/maya.png" alt="Maya" className="w-6 h-6 rounded" /> },
    ],
  },
  {
    method: "Online Banking",
    icon: <BanknoteIcon className="w-5 h-5 text-gray-500" />,
    options: [
      { label: "BDO Online Banking", icon: <img src="/src/assets/bdo.svg" alt="Bdo" className="w-6 h-6 rounded" /> },
      { label: "BPI Online", icon: <BanknoteIcon className="w-6 h-6" /> },
      { label: "Landbank iAccess", icon: <img src="/src/assets/landbank.svg" alt="Landbank" className="w-6 h-6 rounded" /> },
      { label: "Metrobank Online", icon: <img src="/src/assets/Metrobank.svg" alt="Metrobank" className="w-6 h-6 rounded" /> },
      { label: "RCBC Online Banking", icon: <img src="/src/assets/rcbc.svg" alt="RCBC" className="w-6 h-6 rounded" /> },
      { label: "UnionBank Online", icon: <BanknoteIcon className="w-6 h-6 rounded" /> },
    ],
  },
  {
    method: "Buy Now, Pay Later",
    icon: <Clock className="w-5 h-5 text-gray-500" />,
    options: [
      { label: "BillEase", icon: <img src="/src/assets/billease.png" alt="BillEase" className="w-6 h-6 rounded" /> },
      { label: "Pay in Installment", icon: <Clock className="w-6 h-6 rounded" /> },
    ],
  },
];

export default function PaymentForm({ onBack, onNext }: PaymentFormProps) {
  const [method, setMethod] = useState<PaymentData["method"]>("Credit or Debit Card");
  const [selectedOption, setSelectedOption] = useState<PaymentOptionDetail>(paymentMethods[0].options[0]);

  const handleNext = () => {
    onNext({ method });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose your payment method</h2>

      {/* QR Scan button */}
      <div className="flex justify-center items-center mb-6">
        <button className="w-full h-20 rounded-lg flex items-center justify-center p-4 hover:bg-blue-100 border border-gray-200 shadow">
          <h5 className="text-center mr-2">Scan</h5>
          <img src="/src/assets/qrph.png" alt="Qrph" className="w-20 h-auto object-contain mx-2" />
          <h5 className="text-center ml-2">code to pay</h5>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">or pay using</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Payment options */}
      <div className="grid gap-4 w-full">
        {paymentMethods.map((pm) => (
          <div key={pm.method}>
            <div className="rounded font-medium text-gray-500 p-5 hover:bg-blue-100 border border-gray-200 shadow cursor-pointer" onClick={() => setMethod(pm.method)}>
              <div className="flex items-center space-x-2">
                {pm.icon}
                <span className="text-gray-700">{pm.method}</span>
              </div>
            </div>

            <hr className="border-gray-300 mb-2" />

            {method === pm.method && (
              <div className="border border-gray-300 rounded overflow-hidden">
                {pm.options.map((opt, index) => {
                  const isSelected = selectedOption.label === opt.label && method === pm.method;
                  const roundedClass = index === 0 ? "rounded-t" : index === pm.options.length - 1 ? "rounded-b" : "";

                  return (
                    <label
                      key={opt.label}
                      className={`flex items-center gap-2 p-5 cursor-pointer border-b last:border-b-0 ${isSelected ? "bg-blue-200 border-gray-200" : "bg-white border-gray-200"} ${roundedClass}`}
                    >
                      <input
                        type="radio"
                        name={`payment-option-${pm.method}`}
                        value={opt.label}
                        checked={isSelected}
                        onChange={() => {
                          setMethod(pm.method);
                          setSelectedOption(opt);
                        }}
                        className="mr-2"
                      />
                      <div className="flex justify-between items-center w-full">
                        <span>{opt.label}</span>
                        {opt.icon}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Back
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700">
          Continue
        </button>
      </div>
    </div>
  );
}
