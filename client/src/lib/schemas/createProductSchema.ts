import { z } from "zod";

/**
 * File validation schema for product images.
 * - Ensures a `File` object is provided
 * - Ensures file size is > 0
 * - Adds a `preview` property containing a temporary URL for displaying the file in the browser
 */
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "A file must be uploaded",
  })
  .transform((file) => ({
    ...file,
    preview: URL.createObjectURL(file),
  }));

/**
 * Schema for creating a new product.
 * Uses Zod for validation and type inference.
 * Validates required fields, minimum values, and ensures an image is provided.
 */
export const createProductSchema = z
  .object({
    name: z.string({ message: "Name of product is required" }),
    description: z.string({ message: "Description must be at least 10 characters" }),
    price: z.coerce.number({ message: "Price is required" })
      .min(100, "Price must be at least ₱1.00"), // price in cents
    type: z.string({ message: "Type is required" }),
    brand: z.string({ message: "Brand is required" }),
    quantityInStock: z.coerce.number({ message: "Quantity is required" })
      .min(1, "Quantity must be at least 1"),
    pictureUrl: z.string().optional(), // optional if a file is provided
    file: fileSchema.optional(),
  })
  .refine((data) => data.pictureUrl || data.file, {
    message: "Please provide an image",
    path: ["file"], // assign error to `file` field
  });

/**
 * TypeScript type inferred from Zod schema for creating products.
 * Ensures type safety across the app when handling new product forms.
 */
export type CreateProductSchema = z.infer<typeof createProductSchema>;
