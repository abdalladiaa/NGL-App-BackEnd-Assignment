import jwt from "jsonwebtoken";

import config from "../../lib/config/config.js";

import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function generateToken(
  payload = {},
  tokenType = TokenEnum.accessToken,
) {
  const isAccessToken = tokenType === TokenEnum.accessToken;

  return jwt.sign(
    {
      ...payload,
    },
    isAccessToken ? config.jwt.accessSecret : config.jwt.refreshSecret,
    {
      expiresIn: isAccessToken
        ? config.jwt.accessExpiresIn
        : config.jwt.refreshExpiresIn,
    },
  );
}
