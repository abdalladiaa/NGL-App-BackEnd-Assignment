import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js";
import dbConnection from "./database/db.connection.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import AppError from "./common/error/error.js";
import { logger } from "./common/log/logger.js";

const app = express();

app.use(cors(), express.json());

await dbConnection();

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
