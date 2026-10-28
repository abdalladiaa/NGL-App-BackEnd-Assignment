import cacheClient from "../../lib/cache/init.js";
import { otpVerifyEmailKey } from "../cache/otpVerifyEmailKey.js";

export default async function getOtpByEmail(email) {
  return await cacheClient.get(otpVerifyEmailKey(email));
}
