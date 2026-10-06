import jwt from "jsonwebtoken";
import authError from "../../modules/auth/auth.error.js";

export default function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw authError.invalidAccessToken();
  }
}
