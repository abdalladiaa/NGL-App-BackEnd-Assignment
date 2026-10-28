import userError from "../user/user.error.js";
import * as userRepo from "../user/user.repo.js";
import messageError from "./message.error.js";
import * as messageRepo from "./message.repo.js";

export const sendMessage = async (messageData) => {
  if (messageData.receiver === messageData.sender) {
    throw messageError.cannotSendMessageToSelf();
  }
  const userExist = await userRepo.getUserById(messageData.receiver);
  if (!userExist) {
    throw userError.userNotFound();
  }
  return await messageRepo.sendMessage(messageData);
};


export const getAllMessages = async (userId)=>{
  const userExist = await userRepo.getUserById(userId)
  if(!userExist){
    throw userError.userNotFound()
  }
  return await messageRepo.getAllMessages(userId)
}