import bcrypt from "bcrypt";
import config from "../../lib/config/config.js";

export default async function hashPassword(
  password,
  salt = config.encryption.saltRound,
) {
  return await bcrypt.hash(password, salt);
}
