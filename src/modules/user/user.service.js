import userError from "./user.error.js";
import * as userRepo from "./user.repo.js";
import fs from "node:fs/promises";

export const getProfile = async (id) => {
  const userExist = await userRepo.getUserById(id);
  if (!userExist) {
    throw userError.userNotFound();
  }
  return userExist;
};

export const uploadProfilePic = async (userId, file) => {
  const userExist = await userRepo.getUserById(userId);

  if (!userExist) {
    throw userError.userNotFound();
  }

  if (userExist.profilePicture && userExist.profilePicture != file.path) {
    await fs.unlink(userExist.profilePicture).catch(() => {});
  }

  await userRepo.updateUserByEmail(userExist.email, {
    profilePicture: file.path,
  });
};
