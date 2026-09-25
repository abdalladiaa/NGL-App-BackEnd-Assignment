import OTP from "../../database/models/otp.model.js";

export async function createOtp(otpData) {
  return await OTP.create(otpData);
}

export async function getOtpByEmail(email) {
  return await OTP.findOne({ email });
}


export async function deleteOTPsByEmail(email){
  return await OTP.deleteMany({email})
}