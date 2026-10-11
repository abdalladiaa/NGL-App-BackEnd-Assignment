import config from "../../lib/config/config.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function saveTokenInCookie(
  res,
  token,
  tokenType = TokenEnum.accessToken,
) {
  const isAccessToken = tokenType === TokenEnum.accessToken;

  res.cookie(
    isAccessToken ? TokenEnum.accessToken : TokenEnum.refreshToken,
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
