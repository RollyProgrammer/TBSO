import { z } from "zod";

// Define a Zod schema for user registration form validation
export const registerSchema = z.object({
  // Email field validation
  email: z.string() // must be a string
    .email("Invalid email address"), // must follow email format, custom error message

  // Password field validation
  password: z.string()
    .min(6, "Password must be at least 6 characters long") // minimum length 6
    .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter") // at least one lowercase
    .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter") // at least one uppercase
    .refine((val) => /\d/.test(val), "Password must contain at least one number") // at least one digit
    .refine((val) => /[!@#$%^&*]/.test(val), "Password must contain at least one special character (!@#$%^&*)"), // at least one special char
});

// TypeScript type inferred from the schema
// This type ensures type safety when using the schema in forms
export type RegisterSchema = z.infer<typeof registerSchema>;
