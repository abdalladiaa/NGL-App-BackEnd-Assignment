import z from "zod";
import { objectIdValidate } from "../../lib/validator/objectId.validator.js";

export const sendMessageDto = z.object({
  receiver: objectIdValidate,
  content: z.string().min(1).max(200),
});
