import cacheClient from "../../lib/cache/init.js";
import { otpVerifyEmailKey } from "../cache/otpVerifyEmailKey.js";

export default async function deleteOtpByEmail(email) {
  return await cacheClient.del(otpVerifyEmailKey(email));
}
