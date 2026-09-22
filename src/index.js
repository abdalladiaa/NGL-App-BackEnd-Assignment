import "dotenv/config"
import express from "express";
import userRouter from "./modules/user/user.routes.js";
import dbConnection from "./database/db.connection.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import AppError from "./common/error/error.js";

const app = express();

app.use(express.json());

await dbConnection();

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("application is running on port 3000");
});
