import successResponse from "../../common/response/successResponse.js";
import { toMs } from "../../utils/times/times.js";
import decodeToken from "../../utils/token/decodeToken.js";
import * as authService from "./auth.service.js";


export const register = async (req, res, next) => {
  const userData = req.body;
  try {
    const createdUser = await authService.register(userData);
    successResponse({
      res,
      message: "user created successfully",
      status: 201,
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  const { email, code } = req.body || {};
  try {
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
  const { email, password } = req.body || {};
  try {
    const token = await authService.login(email, password);
    const data = await decodeToken(token);

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: toMs(1, "hour"),
    });
    successResponse({
      res,
      message: "user login successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body || {};
  try {
    await authService.sendOtp(email);
    successResponse({ res, status: 200, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};
