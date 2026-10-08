import { Router } from "express";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);


