// Import types from React Hook Form and your Order models
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { PaymentSummary, ShippingAddress } from "../app/models/order";

/**
 * Format a number (in centavos) to Philippine Peso currency string.
 * Example: 123456 => ₱1,234.56
 * @param amount Amount in centavos
 * @returns Formatted currency string
 */
export function currencyFormat(amount: number) {
  return '₱' + (amount / 100).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Remove object entries with empty, null, undefined, or empty array values.
 * Useful for cleaning up form data before sending to API.
 * @param values Object to filter
 * @returns Filtered object
 */
export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value.length !== 0
    )
  );
}

/**
 * Format a shipping address as a single string.
 * Example: "John Doe, 123 Main St, Manila, NCR, 1000, Philippines"
 * @param address ShippingAddress object
 * @returns Formatted string
 */
export function formatAddressString(address: ShippingAddress) {
  return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
}

/**
 * Format a payment summary (credit card info) as a readable string.
 * Example: "VISA, **** **** **** 1234, Exp: 12/2025"
 * @param card PaymentSummary object
 * @returns Formatted string
 */
export function formatPaymentString(card: PaymentSummary) {
  return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, Exp: ${card?.exp_month}/${card?.exp_year}`;
}

/**
 * Handle API errors for a form and map them to specific fields.
 * Splits comma-separated error messages and sets errors on matching fields.
 * @param error API error object
 * @param setError React Hook Form setError function
 * @param fieldNames List of field names to match against error messages
 */
export function handleApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldNames: Path<T>[]
) {
  const apiError = (error as { message?: string }) || {};

  if (apiError.message && typeof apiError.message === 'string') {
    const errorArray = apiError.message.split(',');

    errorArray.forEach(element => {
      const matchedField = fieldNames.find(field =>
        element.toLowerCase().includes(field.toString().toLowerCase())
      );

      if (matchedField) setError(matchedField, { message: element.trim() });
    });
  }
}
