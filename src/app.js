import "./lib/config/config.js";
import express from "express";
import cors from "cors";
import userRouter from "./modules/user/user.routes.js";
import dbConnection from "./database/db.connection.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import AppError from "./pkg/error/error.js";
import cookieParser from "cookie-parser";
import { router } from "./route.js";

export async function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use(cookieParser());

  await dbConnection();

app.use('/api' , router)

  app.use((req, res, next) => {
    next(new AppError("Route not found", 404));
  });

  app.use(errorMiddleware);



  return app
}
