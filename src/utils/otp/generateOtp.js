import crypto from "node:crypto";

export default function generateOtp() {
  return crypto.randomInt(100000, 1000000);
}
