import jwt from "jsonwebtoken";
import { toMs } from "../times/times.js";

export default function generateToken(id, email, name) {
  return jwt.sign(
    {
      id,
      email,
      name,
    },
    process.env.JWT_SECRET,
    { expiresIn: toMs(1, "hour") },
  );

}
