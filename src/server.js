import http from "node:http";
import { createApp } from "./app.js";
import mongoose from "mongoose";
import { logger } from "./pkg/log/logger.js";
import { PORT } from "./lib/config/config.js";

const app = await createApp();

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});

async function shutDown() {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutDown);

process.on("SIGTERM", shutDown);
