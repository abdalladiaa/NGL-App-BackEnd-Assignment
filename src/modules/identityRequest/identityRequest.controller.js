import successResponse from "../../lib/response/successResponse.js";
import * as identityRequestService from "./identityRequest.service.js";

export const createIdentityRequest = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const requester = req.user?.id;
    await identityRequestService.createIdentityRequest({
      message: messageId,
      requester,
    });

    successResponse({
      res,
      message: "Request sent successfully",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllIdentityRequests = async (req, res, next) => {
  try {
    const senderId = req.user?.id;
    const requests =
      await identityRequestService.getAllIdentityRequests(senderId);

    successResponse({
      res,
      data: { requests },
    });
  } catch (err) {
    next(err);
  }
};

export const acceptIdentityRequest = async (req ,res ,next)=>{
  try{
    const senderId = req.user?.id
    const {requestId} = req.params
    await identityRequestService.acceptIdentityRequest(senderId , requestId)
    successResponse({
      res,
      message:"request accepted successfully"
    })
  }catch(err){
    next(err)
  }
}