import config from "../lib/config/config.js";
import { TokenEnum } from "../lib/enums/token.enum.js";
import authError from "../modules/auth/auth.error.js";
import getTokenSecret from "../utils/token/getTokenSecret.js";
import verifyToken from "../utils/token/verifyToken.js";

export function auth(tokenType = TokenEnum.accessToken) {
  return (req, res, next) => {
    try {
      const token = req.cookies?.[tokenType];

      console.log({ token });

      if (!token) {
        return next(authError.unauthorized());
      }

      const secret = getTokenSecret(tokenType);

      const payload = verifyToken(token, secret);

      console.log({ payload });

      if (!payload.id) {
        return next(authError.idNotFound());
      }

      if (payload.type !== tokenType) {
        return next(authError.unauthorized());
      }

      req.payload = payload;
      return next();
    } catch (err) {
      return next(err);
    }
  };
}
