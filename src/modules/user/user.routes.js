import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import * as userController from "./user.controller.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

const userRouter = Router();

userRouter.get("/get-profile", auth(TokenEnum.accessToken), userController.getProfile);

export default userRouter;
