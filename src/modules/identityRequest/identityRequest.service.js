import * as identityRequestRepo from "./identityRequest.repo.js";
import * as messageRepo from "../message/message.repo.js";
import * as userRepo from "../user/user.repo.js";
import messageError from "../message/message.error.js";
import identityRequestError from "./identity-requests.error.js";
import userError from "../user/user.error.js";
import { RequestStatusEnum } from "../../lib/enums/identity-request.enum.js";

export const createIdentityRequest = async (requestData) => {
  const messageExist = await messageRepo.getMessageById(requestData.message);

  if (!messageExist) {
    throw messageError.messageNotFound();
  }
  if (requestData.requester.toString() != messageExist.receiver.toString()) {
    throw identityRequestError.unauthorized();
  }

  const requestExist = await identityRequestRepo.getIdentityRequestByMessageId(
    requestData.message,
  );

  console.log(messageExist);

  if (requestExist) {
    throw identityRequestError.requestAlreadyExists();
  }

  return await identityRequestRepo.createIdentityRequest({
    message: messageExist._id,
    requester: requestData.requester,
    sender: messageExist.sender,
  });
};

export const getAllIdentityRequests = async (senderId) => {
  const userExist = await userRepo.getUserById(senderId);
  if (!userExist) {
    throw userError.userNotFound();
  }
  const requests =
    await identityRequestRepo.getIdentityRequestsBySenderId(senderId);
  if (requests.length === 0) {
    throw identityRequestError.requestsNotFound();
  }

  return requests;
};

export const acceptIdentityRequest = async (senderId, requestId) => {
  const senderExist = await userRepo.getUserById(senderId);
  if (!senderExist) {
    throw userError.userNotFound();
  }
  const identityRequest =
    await identityRequestRepo.getIdentityRequestsById(requestId);

  if (!identityRequest) {
    throw identityRequestError.requestNotFound();
  }

  if (identityRequest.sender.toString() !== senderId) {
    throw identityRequestError.unauthorized();
  }

  return await identityRequestRepo.updateIdentityRequestStatus({
    requestId,
    senderId,
    status: RequestStatusEnum.ACCEPTED,
  });
};
