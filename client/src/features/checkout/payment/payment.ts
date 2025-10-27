// payment.ts
import type { JSX } from "react";

// Main payment data sent to backend
export interface PaymentData {
  method: "Credit or Debit Card" | "E-Wallets" | "Online Banking" | "Buy Now, Pay Later";
  cardBrand?: string; // maps to PaymentSummary.brand
  cardNumber?: string; // used for last4
  expMonth?: number | string;
  expYear?: number | string;
  month?: number | string; // optional fallback
  year?: number | string; // optional fallback
}

// Option details inside each payment method
export type PaymentOptionDetail = {
  label: string;
  icon: JSX.Element;
};

// Payment method structure
export type PaymentOption = {
  method: PaymentData["method"];
  options: PaymentOptionDetail[];
  icon: JSX.Element;
};
