import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateBody } from "../../middlewares/validation.middleware.js";
import { loginDto, logInWithGoogleDto, registerDto, resetPasswordDto, sendOtpDto, verifyAccountDto } from "./auth.dto.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerDto) , authController.register);
authRouter.patch("/verify-account",validateBody(verifyAccountDto), authController.verifyAccount);
authRouter.post("/login",validateBody(loginDto), authController.login);
authRouter.post("/send-otp", validateBody(sendOtpDto),authController.sendOtp);
authRouter.patch("/reset-password", validateBody(resetPasswordDto), authController.resetPassword);
authRouter.post("/login-with-google",validateBody(logInWithGoogleDto), authController.loginWithGoogle);

export default authRouter;
