import AppError from "../../common/error/error.js";

const authError = {
  invalidAccessToken: () => new AppError("Invalid access token", 401),

  expiredAccessToken: () => new AppError("Access token expired", 401),

  invalidRefreshToken: () => new AppError("Invalid refresh token", 401),

  expiredRefreshToken: () => new AppError("Refresh token expired", 401),

  unauthorized: () => new AppError("Unauthorized", 401),

  idNotFound: ()=> new AppError("Id not found" , 401)
};

export default authError;
