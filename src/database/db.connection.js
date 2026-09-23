import mongoose from "mongoose";
import { logger } from "../common/log/logger.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("DB connected")
  } catch (err) {
    logger.error(err)
    throw new Error("fail to connect database");
  }
};

export default dbConnection;