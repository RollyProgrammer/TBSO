// Type representing a product in the catalog or inventory
export type Product = {
  id: number; // Unique product ID
  name: string; // Product name
  description: string; // Product description
  price: number; // Price of the product
  pictureUrl: string; // URL of the product image
  type: string; // Product type or category
  brand: string; // Product brand
  quantityInStock: number; // Current stock quantity available
  unitSold: number; // Number of units sold
  createdAt: string; // Timestamp when the product was created
}
