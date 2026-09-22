import crypto from "node:crypto";
import { toMs } from "../times/times.js";
import { createOtp } from "../../modules/otp/otp.repo.js";

export default async function generateOtp(
  email,
  expiresAt = Date.now() + toMs(5, "minute"),
) {
  const code = crypto.randomInt(100000, 1000000);
  await createOtp({
    email,
    code,
    expiresAt,
  });

  return code;
}
