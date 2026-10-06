import successResponse from "../../common/response/successResponse.js";
import * as userService from "./user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const payload = req.payload;
    const user = await userService.getProfile(payload.id);
    successResponse({ res, data:{ user}, status: 200 });
  } catch (err) {
    next(err);
  }
};
