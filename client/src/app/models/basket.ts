// Importing the Product type for type safety
import type { Product } from "./product";

// Type definition for a shopping basket
export type Basket = {
  basketId: string; // Unique identifier for the basket
  items: Item[]; // Array of items in the basket
  clientSecret?: string; // Optional Stripe client secret for payments
  paymentIntentId?: string; // Optional Stripe payment intent ID
};

// Class representing an individual item in the basket
export class Item {
  // Constructor initializes an Item using a Product object and quantity
  constructor(product: Product, quantity: number) {
    this.productId = product.id; // ID of the product
    this.name = product.name; // Name of the product
    this.price = product.price; // Price of the product
    this.pictureUrl = product.pictureUrl; // URL of the product image
    this.brand = product.brand; // Brand of the product
    this.type = product.type; // Type/category of the product
    this.quantity = quantity; // Quantity of this item in the basket
  }

  productId: number; // Product ID
  name: string; // Product name
  price: number; // Product price
  pictureUrl: string; // Product image URL
  brand: string; // Product brand
  type: string; // Product type/category
  quantity: number; // Quantity of this item
}
