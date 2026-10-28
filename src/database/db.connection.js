import mongoose from "mongoose";
import { logger } from "../pkg/log/logger.js";
import dns from "node:dns/promises";   
dns.setServers(["1.1.1.1", "1.0.0.1"]);  

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("DB connected");
  } catch (err) {
    logger.error(err);
    throw new Error("fail to connect database");
  }
};

export default dbConnection;
