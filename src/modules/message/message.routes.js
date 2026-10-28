import { Router } from "express"
import * as messageController from "./message.controller.js"
import { auth } from "../../middlewares/auth.middleware.js"
import { validateBody } from "../../middlewares/validation.middleware.js"
import { sendMessageDto } from "./message.dto.js"
import limiterMiddleWare from "../../middlewares/limiter.middleware.js"
import { toMs } from "../../utils/times/times.js"

const messageRouter = Router();

messageRouter.use(limiterMiddleWare({limit:10 , windowMs:toMs(2 , "minute")}))

messageRouter.post("/", validateBody(sendMessageDto), messageController.sendMessage);
messageRouter.post("/public",validateBody(sendMessageDto),auth(),messageController.sendMessage);
messageRouter.get("/get-all-messages" , auth() , messageController.getAllMessages)

export default messageRouter;