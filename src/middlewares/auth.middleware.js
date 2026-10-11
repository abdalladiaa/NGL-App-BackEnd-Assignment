import config from "../lib/config/config.js";
import { TokenEnum } from "../lib/enums/token.enum.js";
import authError from "../modules/auth/auth.error.js";
import verifyToken from "../utils/token/verifyToken.js";

export function auth(tokenType = TokenEnum.accessToken) {
  return async (req, res, next) => {
    try {
      let accessToken = req.cookies[TokenEnum.accessToken];

      if (!accessToken) {
        next(authError.unauthorized());
      }

      const payload = verifyToken(
        accessToken,
        tokenType === TokenEnum.accessToken
          ? config.jwt.accessSecret
          : config.jwt.refreshSecret,
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
