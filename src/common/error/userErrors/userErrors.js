import AppError from "../error.js";


const userError = {
  userAlreadyExists: () => new AppError("User already exists", 409),

  userNotFound: () => new AppError("User not found", 404),

  invalidCredentials: () => new AppError("Invalid email or password", 401),

  emailAlreadyVerified: () => new AppError("Email is already verified", 409),

  emailNotVerified: () => new AppError("Email is not verified", 403),

  invalidOtp: () => new AppError("Invalid OTP", 400),

  otpExpired: () => new AppError("OTP has expired", 400),

  otpAlreadyUsed: () => new AppError("OTP has already been used", 400),

  passwordIncorrect: () => new AppError("Incorrect password", 401),

  passwordRequired: () => new AppError("Password is required", 400),

  emailRequired: () => new AppError("Email is required", 400),

  invalidEmail: () => new AppError("Invalid email address", 400),

  accountNotVerified: () => new AppError("Please verify your email first", 403),

  unauthorized: () => new AppError("Unauthorized", 401),
};

export default userError;
