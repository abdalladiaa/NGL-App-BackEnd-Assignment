import userError from "../user/user.error.js";
import hashPassword from "../../utils/hashing/hashPassword.js";
import generateOtp from "../../utils/otp/generateOtp.js";
import * as authRepo from "./auth.repo.js";
import * as userRepo from "../user/user.repo.js";
import comparePassword from "../../utils/hashing/comparePassword.js";
import generateToken from "../../utils/token/generateToken.js";
import encryption from "../../utils/encryption/encryption.js";
import { decryption } from "../../utils/encryption/decryption.js";
import { verifyGoogleToken } from "../../utils/google/verifyGoogleToken.js";
import { ProviderEnum } from "../../lib/enums/user.enum.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";
import authError from "./auth.error.js";
import { generateRandomUUID } from "../../utils/random/random.js";
import cacheClient from "../../lib/cache/init.js";
import getTokenTTL from "../../utils/token/getTokenTTL.js";
import { userRevokeTokenKey } from "../../utils/cache/userRevokeTokenKey.js";
import createOTP from "../../utils/otp/createOtp.js";
import getOtpByEmail from "../../utils/otp/getOtp.js";
import deleteOtpByEmail from "../../utils/otp/deleteOtp.js";
import { SendEmailEnum } from "../../lib/enums/send-email.enum.js";

export const register = async (userData) => {
  const userExist = await authRepo.checkUserExistByEmail(userData.email);
  if (userExist) throw userError.userAlreadyExists();
  userData.password = await hashPassword(userData.password);

  userData.phone = encryption(userData.phone);

  const createdUser = await authRepo.createUser(userData);
  const code = await generateOtp();

  await createOTP(
    { email: userData.email, code },
    { emailType: SendEmailEnum.OTP.VERIFY_EMAIL },
  );

  return createdUser;
};

export const verifyAccount = async (email, code) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  if (userExist.isVerified) throw userError.emailAlreadyVerified();

  const otpExist = await getOtpByEmail(email);

  if (!otpExist) throw userError.otpExpired();

  if (otpExist !== code) throw userError.invalidOtp();

  const user = await userRepo.updateUserByEmail(email, { isVerified: true });

  if (user) await deleteOtpByEmail(user.email);

  return user;
};

export const enable2StepVerification = async (email, code) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  const otpExist = await getOtpByEmail(email);

  if (!otpExist) throw userError.otpExpired();

  if (otpExist !== code) throw userError.invalidOtp();

  const user = await userRepo.updateUserByEmail(email, {
    twoStepVerificationEnabled: true,
  });

  if (user) await deleteOtpByEmail(user.email);

  return user;
};

export const verifyCodeToLogin = async (email, code) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  const otpExist = await getOtpByEmail(email);

  if (!otpExist) throw userError.otpExpired();

  if (otpExist !== code) throw userError.invalidOtp();

  await deleteOtpByEmail(userExist.email);

  const jti = generateRandomUUID();
  const accessToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
      jti,
    },
    TokenEnum.ACCESS_TOKEN,
  );

  const refreshToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
      jti,
    },
    TokenEnum.REFRESH_TOKEN,
  );

  return { accessToken, refreshToken };
};

export const login = async (email, password) => {
  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  if (userExist.isVerified === false) throw userError.emailNotVerified();

  if (!password) throw userError.passwordRequired();

  if (userExist.provider === ProviderEnum.GOOGLE) {
    throw userError.googleAccount();
  }

  const matchPassword = await comparePassword(password, userExist.password);
  if (!matchPassword) throw userError.passwordIncorrect();

  userExist.phone = decryption(userExist.phone);

  if (userExist.twoStepVerificationEnabled) {
    const code = await generateOtp();
    await createOTP(
      { email, code },
      { emailType: SendEmailEnum.OTP.TWO_STEP_VERIFICATION },
    );
    return;
  }

  const jti = generateRandomUUID();
  const accessToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
      jti,
    },
    TokenEnum.ACCESS_TOKEN,
  );

  const refreshToken = generateToken(
    {
      id: userExist._id,
      email: userExist.email,
      fullName: userExist.fullName,
      jti,
    },
    TokenEnum.REFRESH_TOKEN,
  );

  return { accessToken, refreshToken };
};

export const sendOtp = async (email) => {
  if (!email) throw userError.emailRequired();

  const userExist = await authRepo.checkUserExistByEmail(email);
  if (!userExist) throw userError.userNotFound();

  if (userExist.provider === ProviderEnum.GOOGLE) {
    throw userError.googleAccount();
  }

  const code = await generateOtp();

  await createOTP(
    { email: userExist.email, code },
    { emailType: SendEmailEnum.OTP.NEW_OTP },
  );
};

export const resetPassword = async (email, code, newPassword) => {
  const otp = await getOtpByEmail(email);
  if (!otp) {
    throw userError.otpExpired();
  }
  if (otp !== code) {
    throw userError.invalidOtp();
  }
  newPassword = await hashPassword(newPassword);
  await userRepo.updateUserByEmail(email, {
    password: newPassword,
  });
  await deleteOtpByEmail(email);
};

export const logInWithGoogle = async (idToken) => {
  const payload = await verifyGoogleToken(idToken);

  const userExist = await authRepo.checkUserExistByEmail(payload.email);
  const jti = generateRandomUUID();
  if (userExist) {
    const accessToken = generateToken(
      {
        id: userExist._id,
        email: userExist.email,
        fullName: userExist.fullName,
        jti,
      },
      TokenEnum.ACCESS_TOKEN,
    );
    const refreshToken = generateToken(
      {
        id: userExist._id,
        email: userExist.email,
        fullName: userExist.fullName,
        jti,
      },
      TokenEnum.REFRESH_TOKEN,
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
    provider: ProviderEnum.GOOGLE,
  });
  const fullName = `${firstName} ${lastName}`;
  const accessToken = generateToken(
    {
      id: createdUser._id,
      email: createdUser.email,
      fullName,
      jti,
    },
    TokenEnum.ACCESS_TOKEN,
  );
  const refreshToken = generateToken(
    {
      id: createdUser._id,
      email: createdUser.email,
      fullName,
      jti,
    },
    TokenEnum.REFRESH_TOKEN,
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const rotateToken = async (payload) => {
  const { iat, exp, ...user } = payload;

  const refreshExpiresIn = getTokenTTL(exp);

  if (refreshExpiresIn <= 0) {
    throw new authError.expiredRefreshToken();
  }

  const accessToken = generateToken(user, TokenEnum.ACCESS_TOKEN);

  const refreshToken = generateToken(
    user,
    TokenEnum.REFRESH_TOKEN,
    refreshExpiresIn,
  );

  return { accessToken, refreshToken };
};

export const logout = async (payload) => {
  const { id, jti, exp } = payload;
  const ttl = getTokenTTL(exp);
  return await cacheClient.set(userRevokeTokenKey(id, jti), jti, ttl);
};
