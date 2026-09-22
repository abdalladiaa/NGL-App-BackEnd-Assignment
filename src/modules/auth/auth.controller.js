import * as authService from "./auth.service.js";

export const register = async (req, res, next) => {
  const userData = req.body;
  try {
    const createdUser = await authService.register(userData);
    res.status(201).send({
      message: "user created successfully",
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const user = await authService.verifyAccount(email, code);
    res.status(200).send({
      message: "user verified successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
