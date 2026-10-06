import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../common/config/config.js";
import { TokenEnum } from "../../common/enums/token.enum.js";

export default function saveTokenInCookie(
  res,
  token,
  tokenType = TokenEnum.accessToken,
) {
  const isAccessToken = tokenType === TokenEnum.accessToken;

  res.cookie(isAccessToken ? "access_token" : "refresh_token", token, {
    httpOnly: true,
    maxAge: isAccessToken ? JWT_ACCESS_EXPIRES_IN : JWT_REFRESH_EXPIRES_IN,
  });

  return true;
}
