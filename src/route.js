import { Router } from "express";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import messageRouter from "./modules/message/message.routes.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/message" , messageRouter)


