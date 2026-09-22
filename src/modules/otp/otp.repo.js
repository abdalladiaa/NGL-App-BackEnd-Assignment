import OTP from "../../DB/models/otp.model.js";

export async function createOtp(otpData) {
  return await OTP.create(otpData);
}

export async function getOtpByEmail(email) {
  return await OTP.findOne({ email });
}


export async function deleteOtpByEmail(email){
  return await OTP.deleteOne({email})
}