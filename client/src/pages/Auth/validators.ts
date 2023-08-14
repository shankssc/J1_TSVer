import { z } from "zod";

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters long');
const emailSchema = z.string().email('Please enter a valid email address');

export const Loginschema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema
    .refine((val) => val.password === val.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
    }),
});
