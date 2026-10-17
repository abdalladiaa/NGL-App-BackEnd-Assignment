import config from "../../lib/config/config.js"
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function getTokenSecret(tokenType = TokenEnum.ACCESS_TOKEN) {
  return tokenType === TokenEnum.ACCESS_TOKEN
    ? config.jwt.accessSecret
    : config.jwt.refreshSecret;
}