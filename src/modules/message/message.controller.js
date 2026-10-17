import successResponse from "../../lib/response/successResponse.js";
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
