import { TokenEnum } from "../../common/enums/token.enum.js";
import successResponse from "../../common/response/successResponse.js";
import decodeToken from "../../utils/token/decodeToken.js";
import saveTokenInCookie from "../../utils/token/saveTokenInCookie.js";
import * as authService from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const userData = req.body;

    const createdUser = await authService.register(userData);

    successResponse({
      res,
      message: "user created successfully",
      status: 201,
      data: { user: createdUser },
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await authService.verifyAccount(email, code);
    successResponse({
      res,
      message: "user verified successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      email,
      password,
    );

    const user = decodeToken(accessToken);

    saveTokenInCookie(res, accessToken, TokenEnum.accessToken);
    saveTokenInCookie(res, refreshToken, TokenEnum.refreshToken);

    successResponse({
      res,
      message: "user login successfully",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.sendOtp(email);
    successResponse({ res, status: 200, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    await authService.resetPassword(email, code, newPassword);
    successResponse({
      res,
      status: 200,
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const { accessToken, refreshToken } =
      await authService.logInWithGoogle(idToken);
    const user = decodeToken(accessToken);

    saveTokenInCookie(res, accessToken);
    saveTokenInCookie(res, refreshToken, TokenEnum.refreshToken);

    successResponse({
      res,
      status: 200,
      message: "user logged in successfully",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
