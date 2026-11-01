import { Router } from "express";
import * as identityRequestsController from "./identityRequest.controller.js";
import { validateParams } from "../../middlewares/validation.middleware.js";
import { createIdentityRequestDto } from "./identity-requests.dto.js";
import { auth } from "../../middlewares/auth.middleware.js";

const identityRequestsRouter = Router();

identityRequestsRouter.post(
  "/:messageId",
  validateParams(createIdentityRequestDto),
  auth(),
  identityRequestsController.createIdentityRequest,
);

identityRequestsRouter.get(
  "/",
  auth(),
  identityRequestsController.getAllIdentityRequests,
);

identityRequestsRouter.patch(
  "/:requestId",
  auth(),
  identityRequestsController.acceptIdentityRequest
)

export default identityRequestsRouter;
