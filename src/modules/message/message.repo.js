import Message from "../../database/models/message.model.js";

export async function sendMessage(messageData) {
  return await Message.create(messageData);
}

export async function getAllMessages(userId) {
  return await Message.find(
    { receiver: userId },
    {},
    {
      populate: {
        path: "sender",
        select: "-password",
        
      },
    },
  );
}
