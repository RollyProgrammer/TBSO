export type Product = {
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
  unitSold: number
  createdAt: string; // ISO date string from backend
}
