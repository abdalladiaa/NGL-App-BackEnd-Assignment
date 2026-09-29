import { email, z } from "zod";
import { GenderEnum, ProviderEnum } from "../../common/enums/user.enum.js";

export const registerDto = z.object({
  email: z.email().toLowerCase().trim(),
  firstName: z.string().min(8).max(20).trim(),
  password: z.string().min(4).max(20).trim(),
  gender: z.enum(GenderEnum).default(GenderEnum.Other),
});

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
