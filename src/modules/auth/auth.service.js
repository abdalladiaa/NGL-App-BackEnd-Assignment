import AppError from "../../common/error/error.js";
import userError from "../../common/error/userErrors/userErrors.js";
import { sendEmail } from "../../common/mail/mail.js";
import { verifyEmailTemplate } from "../../templates/verifyEmail.template.js";
import hashPassword from "../../utils/hashing/hashPassword.js";
import generateOtp from "../../utils/otp/generateOtp.js";
import { toMs } from "../../utils/times/times.js";
import * as authRepo from "./auth.repo.js";
import * as otpRepo from "../otp/otp.repo.js";
import * as userRepo from "../user/user.repo.js";

export const register = async (userData) => {
  const userExist = await authRepo.checkUserExistByEmail(userData.email);
  if (userExist) throw userError.userAlreadyExists();
  userData.password = await hashPassword(userData.password);

  const createdUser = await authRepo.createUser(userData);
  const otp = generateOtp();
  await otpRepo.createOtp({
    email: userData.email,
    code: otp,
    expiresAt: Date.now() + toMs(5, "minute"),
  });
  sendEmail(userData.email, "Verification OTP", verifyEmailTemplate(otp));
  return createdUser;
};

export const verifyAccount = async (email, code) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  if (userExist.isVerified) throw userError.emailAlreadyVerified();

  const otpExist = await otpRepo.getOtpByEmail(email);

  if (!otpExist) throw userError.otpExpired();

  if (otpExist.code !== code) throw userError.invalidOtp();

  const user = await userRepo.updateUserByEmail(email, { isVerified: true });

  if (user) await otpRepo.deleteOtpByEmail(user.email);

  return user;
};
