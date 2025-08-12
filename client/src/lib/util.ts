import type { PaymentSummary, ShippingAddress } from "../app/models/order";

// export function currencyFormat(amount: number | string | null | undefined): string {
//   const num = Number(amount);
//   if (isNaN(num)) return "";

//   const hasCents = num % 1 !== 0; // true if there's a fractional part

//   return num.toLocaleString("en-PH", {
//     style: "currency",
//     currency: "PHP",
//     minimumFractionDigits: hasCents ? 2 : 0,
//     maximumFractionDigits: 2,
//   });
// }

export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2)
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== "" && value !== null && value !== undefined && value.length !== 0));
}

export function formatAddressString(address: ShippingAddress) {
  return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
}

export function formatPaymentString(card: PaymentSummary) {
  return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
}
