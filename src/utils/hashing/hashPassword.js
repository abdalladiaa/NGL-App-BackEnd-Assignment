import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../common/config/config.js";

export default async function hashPassword(password, salt = SALT_ROUND) {
  return await bcrypt.hash(password, salt);
}
