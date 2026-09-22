import { toMs } from "../../utils/times/times.js";
import * as authService from "./auth.service.js";

export const register = async (req, res, next) => {
  const userData = req.body;
  try {
    const createdUser = await authService.register(userData);
    res.status(201).send({
      success: true,
      message: "user created successfully",
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
    res.status(200).send({
      success: true,
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

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: toMs(1, "hour"),
    });
    res.status(200).send({
      success: true,
      message: "user login successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body || {};
  try {
    await authService.sendOtp(email);
    res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    next(err);
  }
};
