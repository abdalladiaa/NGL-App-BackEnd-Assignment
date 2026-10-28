import successResponse from "../../lib/response/successResponse.js";
import messageError from "./message.error.js";
import * as messageService from "./message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const messageData = req.body;
    const sender = req.user?.id;
    const message = await messageService.sendMessage({
      ...messageData,
      sender,
    });
    successResponse({
      res,
      status: 201,
      message: "message sent successfully",
      data: { message },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const messages = await messageService.getAllMessages(userId);
    if(messages.length === 0 ){
      throw messageError.messagesNotFound()
    }
    successResponse({
      res,
      status: 200,
      data: { messages },
    });
  } catch (err) {
    next(err);
  }
};
