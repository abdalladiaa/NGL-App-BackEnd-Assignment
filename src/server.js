import http from "node:http";
import { createApp } from "./app.js";
import mongoose from "mongoose";
import { logger } from "./pkg/log/logger.js";

const app = await createApp();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  logger.info(`server is running on port ${port}`);
});



async function shutDown() {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutDown);

process.on("SIGTERM", shutDown);
