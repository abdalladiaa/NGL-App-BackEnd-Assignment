import { z } from "zod";
import { GenderEnum } from "../../common/enums/user.enum.js";

export const registerDto = z
  .object({
    email: z.email().toLowerCase().trim(),
    firstName: z.string().min(3).max(20).trim(),
    lastName: z.string().min(3).max(20).trim(),
    password: z.string().min(4).max(20).trim(),
    confirmPassword: z.string(),
    gender: z.enum(GenderEnum).default(GenderEnum.Other),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "confirm password must match the password. ",
      path: ["confirmPassword"],
    },
  );

export const verifyAccountDto = z.object({
  email: z.email().toLowerCase().trim(),
  code: z.string().length(6).trim(),
});

export const sendOtpDto = z.object({
  email: z.email().toLowerCase().trim(),
});

export const loginDto = z.object({
  email: z.email().toLowerCase().trim(),
  password: z.string().min(4).max(20).trim(),
});

export const resetPasswordDto = z.object({
  email: z.email().toLowerCase().trim(),
  code: z.string().length(6).trim(),
  newPassword: z.string().min(4).max(20).trim(),
});

export const logInWithGoogleDto = z.object({
  idToken: z.string(),
});
