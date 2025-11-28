import { z } from "zod";

/**
 * Schema for user login form validation.
 * Uses Zod for runtime validation and TypeScript type inference.
 */
export const loginSchema = z.object({
  email: z.string().email(''), // must be a valid email string
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }), // minimum 6 characters
});

/**
 * TypeScript type inferred from loginSchema.
 * Ensures type safety when handling login forms.
 */
export type LoginSchema = z.infer<typeof loginSchema>;
