import crypto from "node:crypto";

export default async function generateOtp() {
  const code = crypto.randomInt(100000, 1000000);

  return code;
}
