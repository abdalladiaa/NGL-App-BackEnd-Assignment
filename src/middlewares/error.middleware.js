import { logger } from "../pkg/log/logger.js";

export default function errorMiddleWare(err, req, res, next) {
  logger.error(err.message, { stack: err.stack });
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
