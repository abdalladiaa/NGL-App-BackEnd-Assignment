import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import * as userController from "./user.controller.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";
import { uploadSingleFile } from "../../lib/media/multer.js";
import { fileValidation } from "../../lib/validator/file.validator.js";
import { UploadTypeEnum } from "../../lib/enums/file-type-enum.js";

const userRouter = Router();

userRouter.get(
  "/get-profile",
  auth(TokenEnum.ACCESS_TOKEN),
  userController.getProfile,
);
userRouter.patch(
  "/upload-profile-pic",
  auth(),
  uploadSingleFile("profile-picture", UploadTypeEnum.PROFILE_IMAGE),
  fileValidation(UploadTypeEnum.PROFILE_IMAGE),
  userController.uploadProfilePic,
);

export default userRouter;
