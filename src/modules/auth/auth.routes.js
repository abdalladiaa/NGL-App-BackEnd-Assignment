import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateBody } from "../../middlewares/validation.middleware.js";
import { loginDto, logInWithGoogleDto, registerDto, resetPasswordDto, sendOtpDto, verifyAccountDto } from "./auth.dto.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerDto) , authController.register);
authRouter.patch("/verify-account",validateBody(verifyAccountDto), authController.verifyAccount);
authRouter.post("/login",validateBody(loginDto), authController.login);
authRouter.post("/send-otp", validateBody(sendOtpDto),authController.sendOtp);
authRouter.patch("/reset-password", validateBody(resetPasswordDto), authController.resetPassword);
authRouter.post("/login-with-google",validateBody(logInWithGoogleDto), authController.loginWithGoogle);
authRouter.post("/rotate-token" , auth(TokenEnum.REFRESH_TOKEN) , authController.rotateToken)
authRouter.post('/logout' , auth(TokenEnum.REFRESH_TOKEN) , authController.logout)

export default authRouter;
