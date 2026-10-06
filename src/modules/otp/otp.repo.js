import OTP from "../../database/models/otp.model.js";

export async function createOtp(otpData) {
  return await OTP.findOneAndUpdate(
    { email: otpData.email },
    { $set: otpData },
    { upsert: true, returnDocument: "after", runValidators: true },
  );
}

export async function getOtpByEmail(email) {
  return await OTP.findOne({ email });
}


export async function deleteOTPsByEmail(email){
  return await OTP.deleteMany({email})
}