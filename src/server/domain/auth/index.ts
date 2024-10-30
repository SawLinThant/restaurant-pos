import { object, string, TypeOf } from "zod";

export const signInSchema = object({
  phone: string({
    required_error: "username is required",
  }),
  password: string({
    required_error: "password is required",
  }),
});

export const signUpSchema = object({
  name: string({
    required_error: "username is required",
  }),
  password: string({
    required_error: "password is required",
  }),
  phone: string({
    required_error: "phone no is required",
  }),
  userType: string({
    required_error: "userType no is required",
  }),
});

export type SignInInput = TypeOf<typeof signInSchema>;
export type SignUpSchema = TypeOf<typeof signUpSchema>;
