import Message from "../../database/models/message.model.js";

export async function sendMessage(messageData) {
  return await Message.create(messageData);
}
