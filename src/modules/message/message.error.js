import AppError from "../../pkg/error/error.js";

const messageError = {
  messageNotFound: () =>
    new AppError("Message not found", 404),

  receiverNotFound: () =>
    new AppError("Receiver not found", 404),

  cannotSendMessageToSelf: () =>
    new AppError("You cannot send a message to yourself", 400),

  unauthorized: () =>
    new AppError("You are not authorized to access this message", 403),

  invalidMessageId: () =>
    new AppError("Invalid message ID", 400),

};

export default messageError;