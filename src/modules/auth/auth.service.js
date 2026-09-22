import userError from "../../common/error/userErrors/userErrors.js";
import { sendEmail } from "../../common/mail/mail.js";
import { verifyEmailTemplate } from "../../templates/verifyEmail.template.js";
import hashPassword from "../../utils/hashing/hashPassword.js";
import generateOtp from "../../utils/otp/generateOtp.js";
import { toMs } from "../../utils/times/times.js";
import * as authRepo from "./auth.repo.js";
import * as otpRepo from "../otp/otp.repo.js";
import * as userRepo from "../user/user.repo.js";
import comparePassword from "../../utils/hashing/comparePassword.js";

import generateToken from "../../utils/token/generateToken.js";

export const register = async (userData) => {
  const userExist = await authRepo.checkUserExistByEmail(userData.email);
  if (userExist) throw userError.userAlreadyExists();
  userData.password = await hashPassword(userData.password);

  const createdUser = await authRepo.createUser(userData);
  const otp = await generateOtp(userData.email);

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

  if (user) await otpRepo.deleteOtpsByEmail(user.email);

  return user;
};

export const login = async (email, password) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound;

  if (userExist.isVerified === false) throw userError.emailNotVerified();

  if (!password) throw userError.passwordRequired();

  const matchPassword = await comparePassword(password, userExist.password);
  if (!matchPassword) throw userError.passwordIncorrect();

  const token = generateToken(
    userExist._id,
    userExist.email,
    userExist.fullName,
  );

  console.log(token);

  return token;
};

export const sendOtp = async (email) => {
  if (!email) throw userError.emailRequired();

  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  await otpRepo.deleteOtpsByEmail(email);

  const otp = await generateOtp(userExist.email);

  await sendEmail(userExist.email, "New OTP", verifyEmailTemplate(otp));
};
