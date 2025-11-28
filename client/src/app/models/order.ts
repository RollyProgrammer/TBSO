// Interface representing an order in the system
export interface Order {
  id: number; // Unique order ID
  buyerEmail: string; // Email of the buyer
  phone: string; // Buyer's phone number
  shippingAddress: ShippingAddress; // Shipping address details
  orderDate: string; // Date when the order was placed
  orderItems: OrderItem[]; // List of items in the order
  subtotal: number; // Total price of items before fees and discounts
  deliveryFee: number; // Delivery/shipping fee
  discount: number; // Discount applied
  total: number; // Final total amount (subtotal + deliveryFee - discount)
  orderStatus: string; // Status of the order (e.g., pending, shipped, delivered)
  paymentSummary: PaymentSummary; // Payment details for the order
}

// Interface representing a shipping address
export interface ShippingAddress {
  name: string; // Recipient's name
  line1: string; // Address line 1
  line2?: string | null; // Optional address line 2
  city: string; // City
  state: string; // State or province
  postal_code: string; // ZIP or postal code
  country: string; // Country
}

// Interface representing a single item in an order
export interface OrderItem {
  productId: number; // ID of the product
  name: string; // Product name
  pictureUrl: string; // URL of the product image
  price: number; // Price per item
  quantity: number; // Quantity ordered
}

// Interface representing payment details for an order
export interface PaymentSummary {
  last4: number | string; // Last 4 digits of the payment card
  brand: string; // Card brand (e.g., Visa, Mastercard)
  exp_month: number; // Expiration month of the card
  exp_year: number; // Expiration year of the card
}

// Interface used when creating a new order
export interface CreateOrder {
  shippingAddress: ShippingAddress; // Shipping address for the new order
  paymentSummary: PaymentSummary; // Payment details for the new order
}
