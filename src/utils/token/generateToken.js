import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../../lib/config/config.js";

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
    isAccessToken ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
    {
      expiresIn: isAccessToken ? JWT_ACCESS_EXPIRES_IN : JWT_REFRESH_EXPIRES_IN,
    },
  );
}
