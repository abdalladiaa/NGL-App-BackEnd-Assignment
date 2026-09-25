import mongoose from "mongoose";
import { logger } from "../common/log/logger.js";
import { MONGO_URI } from "../common/config/config.js";

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("DB connected")
  } catch (err) {
    logger.error(err)
    throw new Error("fail to connect database");
  }
};

export default dbConnection;