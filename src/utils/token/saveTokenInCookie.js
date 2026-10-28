import config from "../../lib/config/config.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function saveTokenInCookie(
  res,
  token,
  tokenType = TokenEnum.ACCESS_TOKEN,
) {
  const isAccessToken = tokenType === TokenEnum.ACCESS_TOKEN;

  res.cookie(
    isAccessToken ? TokenEnum.ACCESS_TOKEN : TokenEnum.REFRESH_TOKEN,
    token,
    {
      httpOnly: true,
      secure: false,
      maxAge: isAccessToken
        ? config.jwt.accessExpiresIn
        : config.jwt.refreshExpiresIn,
    },
  );

  return true;
}