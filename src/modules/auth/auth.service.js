import userError from "../user/user.error.js";
import { sendEmail } from "../../lib/mail/mail.js";
import { verifyEmailTemplate } from "../../templates/verifyEmail.template.js";
import hashPassword from "../../utils/hashing/hashPassword.js";
import generateOtp from "../../utils/otp/generateOtp.js";
import * as authRepo from "./auth.repo.js";
import * as otpRepo from "../otp/otp.repo.js";
import * as userRepo from "../user/user.repo.js";
import comparePassword from "../../utils/hashing/comparePassword.js";
import generateToken from "../../utils/token/generateToken.js";
import encryption from "../../utils/encryption/encryption.js";
import { decryption } from "../../utils/encryption/decryption.js";
import { verifyGoogleToken } from "../../utils/google/verifyGoogleToken.js";
import { ProviderEnum } from "../../lib/enums/user.enum.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";
import { toMs } from "../../utils/times/times.js";

export const register = async (userData) => {
  const userExist = await authRepo.checkUserExistByEmail(userData.email);
  if (userExist) throw userError.userAlreadyExists();
  userData.password = await hashPassword(userData.password);

  userData.phone = encryption(userData.phone);

  const createdUser = await authRepo.createUser(userData);
  const code = await generateOtp();
  await otpRepo.createOtp({
    email: userData.email,
    code,
    expiresAt: Date.now() + toMs(5, "minute"),
  });

  await sendEmail(
    userData.email,
    "Verification OTP",
    verifyEmailTemplate(code),
  );
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

  if (user) await otpRepo.deleteOTPsByEmail(user.email);

  return user;
};

export const login = async (email, password) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  if (userExist.isVerified === false) throw userError.emailNotVerified();

  if (!password) throw userError.passwordRequired();

  if (userExist.provider === ProviderEnum.Google) {
    throw userError.googleAccount();
  }

  const matchPassword = await comparePassword(password, userExist.password);
  if (!matchPassword) throw userError.passwordIncorrect();

  userExist.phone = decryption(userExist.phone);

  const accessToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
    },
    TokenEnum.accessToken,
  );

  const refreshToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
    },
    TokenEnum.refreshToken,
  );

  return { accessToken, refreshToken };
};

export const sendOtp = async (email) => {
  if (!email) throw userError.emailRequired();

  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  const code = await generateOtp();
  await otpRepo.createOtp({
    email: userExist.email,
    code,
    expiresAt: Date.now() + toMs(5, "minute"),
  });

  await sendEmail(userExist.email, "New OTP", verifyEmailTemplate(code));
};

export const resetPassword = async (email, code, newPassword) => {
  const otp = await otpRepo.getOtpByEmail(email);
  if (!otp) {
    throw userError.otpExpired();
  }
  if (otp.code !== code) {
    throw userError.invalidOtp();
  }
  newPassword = await hashPassword(newPassword);
  await userRepo.updateUserByEmail(email, {
    password: newPassword,
  });
  await otpRepo.deleteOTPsByEmail(email);
};

export const logInWithGoogle = async (idToken) => {
  const payload = await verifyGoogleToken(idToken);

  const userExist = await authRepo.checkUserExistByEmail(payload.email);
  if (userExist) {
    const accessToken = generateToken(
      {
        id: userExist._id,
        email: userExist.email,
        fullName: userExist.fullName,
      },
      TokenEnum.accessToken,
    );
    const refreshToken = generateToken(
      {
        id: userExist._id,
        email: userExist.email,
        fullName: userExist.fullName,
      },
      TokenEnum.refreshToken,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  const [firstName, lastName] = payload.name.split(" ");
  const createdUser = await authRepo.createUser({
    firstName,
    lastName,
    email: payload.email,
    isVerified: true,
    provider: ProviderEnum.Google,
  });
  const accessToken = generateToken(
    {
      id: createdUser._id,
      email: createdUser.email,
    },
    TokenEnum.accessToken,
  );
  const refreshToken = generateToken(
    {
      id: createdUser._id,
      email: createdUser.email,
    },
    TokenEnum.refreshToken,
  );
  return {
    accessToken,
    refreshToken,
  };
};
