import successResponse from "../../lib/response/successResponse.js";
import * as userService from "./user.service.js";
import fs from "node:fs/promises";

export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userService.getProfile(id);
    successResponse({ res, data: { user }, status: 200 });
  } catch (err) {
    next(err);
  }
};

export const uploadProfilePic = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.user?.id;

    console.log({file});
    

    await userService.uploadProfilePic(userId, file);
    successResponse({
      res,
      message: "Profile picture uploaded successfully",
    });
  } catch (err) {
    if (req?.file) {
      fs.unlink(req.file.path);
    }
    next(err);
  }
};
