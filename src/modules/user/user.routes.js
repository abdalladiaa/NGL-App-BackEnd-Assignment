import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res, next) => {
  res.send({
    message: "successfully",
  });
});

export default userRouter;
