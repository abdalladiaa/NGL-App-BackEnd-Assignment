import jwt from "jsonwebtoken";

import config from "../../lib/config/config.js";

import { TokenEnum } from "../../lib/enums/token.enum.js";
import getTokenExpiresIn from "./getExpiresIn.js";

export default function generateToken(
  payload = {},
  tokenType = TokenEnum.accessToken,
  expiresIn = getTokenExpiresIn(tokenType),
) {
  const isAccessToken = tokenType === TokenEnum.accessToken;
  return jwt.sign(
    {
      ...payload,
      type: tokenType,
    },
    isAccessToken ? config.jwt.accessSecret : config.jwt.refreshSecret,
    {
      expiresIn,
    },
  );
}
