import cacheClient from "../lib/cache/init.js";
import config from "../lib/config/config.js";
import { TokenEnum } from "../lib/enums/token.enum.js";
import authError from "../modules/auth/auth.error.js";
import { getUserRevokeTokenKey } from "../utils/cache/getUserRevokeTokenKey.js";
import getTokenSecret from "../utils/token/getTokenSecret.js";
import verifyToken from "../utils/token/verifyToken.js";

export function auth(tokenType = TokenEnum.accessToken) {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.[tokenType];

      if (!token) {
        return next(authError.unauthorized());
      }

      const secret = getTokenSecret(tokenType);

      const payload = verifyToken(token, secret);

      if (!payload.id) {
        return next(authError.idNotFound());
      }

      if (payload.type !== tokenType) {
        return next(authError.unauthorized());
      }

      const jtiExistInCache = await cacheClient.exists(
        getUserRevokeTokenKey(payload.id, payload.jti),
      );

      if (jtiExistInCache) {
        return next(authError.tokenRevoked());
      }

      req.payload = payload;
      return next();
    } catch (err) {
      return next(err);
    }
  };
}
