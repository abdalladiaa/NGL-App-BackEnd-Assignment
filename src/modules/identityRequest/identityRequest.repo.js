import IdentityRequest from "../../database/models/identity-reques.model.js";
import { RequestStatusEnum } from "../../lib/enums/identity-request.enum.js";

export async function createIdentityRequest(requestData) {
  return await IdentityRequest.create(requestData);
}

export async function getIdentityRequestByMessageId(messageId) {
  return await IdentityRequest.findOne({ message: messageId });
}

export async function getIdentityRequestsBySenderId(senderId) {
  return await IdentityRequest.find({
    sender: senderId,
    status: RequestStatusEnum.PENDING,
  });
}

export async function getIdentityRequestsById(requestId) {
  return await IdentityRequest.findById(requestId);
}

export async function updateIdentityRequestStatus({
  senderId,
  requestId,
  status,
}) {
  return await IdentityRequest.findOneAndUpdate(
    {
      _id: requestId,
      sender: senderId,
      status: RequestStatusEnum.PENDING,
    },
    {
      $set: { status },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}
