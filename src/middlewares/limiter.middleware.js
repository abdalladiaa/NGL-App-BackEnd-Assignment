import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { toMs } from "../utils/times/times.js";
import AppError from "../pkg/error/error.js";

const limiterMiddleWare = ({
  limit = 2,
  windowMs = toMs(1, "minute"),
} = {}) => {
  return rateLimit({
    limit,
    windowMs,
    handler: function (req, res, next) {
      return next(
        new AppError("Too many requests, please try again later.", 429),
      );
    },
    keyGenerator: (req, res, next) => {
      return `${ipKeyGenerator(req.ip)}::${req.path}`;
    },
  });
};

export default limiterMiddleWare;
