import { logger } from "../common/log/logger.js";

export default function errorMiddleWare(err, req, res, next) {
  logger.error(err.message);
  if (err.isOperational) {
    return res.status(err.statusCode).send({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).send({
    success: false,
    message: "Internal server error",
  });
}
