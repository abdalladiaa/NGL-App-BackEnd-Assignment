import userError from "./user.error.js";
import * as userRepo from "./user.repo.js";

export const getProfile = async (id) => {
  const userExist = await userRepo.getUserById(id);
  if (!userExist) {
    throw userError.userNotFound();
  }
  return userExist;
};
