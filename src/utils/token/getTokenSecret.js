import config from "../../lib/config/config.js"
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function getTokenSecret(tokenType = TokenEnum.accessToken) {
  return tokenType === TokenEnum.accessToken
    ? config.jwt.accessSecret
    : config.jwt.refreshSecret;
}