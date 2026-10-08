import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "../lib/config/config.js";
import { TokenEnum } from "../lib/enums/token.enum.js";
import authError from "../modules/auth/auth.error.js";
import verifyToken from "../utils/token/verifyToken.js";

export function auth(tokenType = TokenEnum.accessToken) {
  return async (req, res, next) => {
    try {
      let accessToken = req.cookies["access_token"];

      if (!accessToken) {
        next(authError.unauthorized());
      }

      const payload = verifyToken(
        accessToken,
        tokenType === TokenEnum.accessToken
          ? JWT_ACCESS_SECRET
          : JWT_REFRESH_SECRET,
      );

      if (!payload.id) {
        next(authError.idNotFound());
      }

      req.payload = payload;
      next();
    } catch (err) {
      next(err);
    }
  };
}
