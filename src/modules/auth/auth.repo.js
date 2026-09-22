import User from "../../DB/models/user.model.js";


export async function createUser(userData) {
  return await User.create(userData);
}

export async function checkUserExistByEmail(email) {
  return await User.findOne({ email });
}
