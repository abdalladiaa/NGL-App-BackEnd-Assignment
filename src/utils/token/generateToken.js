import jwt from "jsonwebtoken";
import { toMs } from "../times/times.js";
import { JWT_SECRET } from "../../common/config/config.js";

export default function generateToken(payload = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: toMs(1, "hour"),
  });
}
