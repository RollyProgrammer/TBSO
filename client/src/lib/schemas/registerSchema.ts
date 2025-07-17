import z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/
);
export const registerSchema = z.object({
  email: z.string().email(""),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must be at least 6 characters long, contain uppercase and lowercase letters, a number, and a special character.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;