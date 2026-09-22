import User from "../../DB/models/user.model.js";

export async function updateUserByEmail(email, updatedData) {
  return await User.findOneAndUpdate({ email }, updatedData, {
    returnDocument: "after",
    runValidators: true,
  });
}
