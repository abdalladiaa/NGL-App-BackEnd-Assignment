import bcrypt from "bcrypt";

export default async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
