import z from "zod";
import { objectIdValidate } from "../../lib/validator/objectId.validator.js";

export const createIdentityRequestDto = z.object({
  messageId: objectIdValidate,
});
