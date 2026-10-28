import cacheClient from "../../lib/cache/init.js";
import { emailOTPExpiresIn } from "../../lib/constants/constants.js";
import { otpVerifyEmailKey } from "../cache/otpVerifyEmailKey.js";

export default async function createOTP(
  email,
  code,
  ttl = emailOTPExpiresIn,
) {
  return await cacheClient.set(otpVerifyEmailKey(email), code, ttl);
}
