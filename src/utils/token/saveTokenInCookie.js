import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../lib/config/config.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function saveTokenInCookie(
  res,
  token,
  tokenType = TokenEnum.accessToken,
) {
  const isAccessToken = tokenType === TokenEnum.accessToken;

  res.cookie(isAccessToken ? "access_token" : "refresh_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: isAccessToken ? JWT_ACCESS_EXPIRES_IN : JWT_REFRESH_EXPIRES_IN,
  });

  return true;
}
