import config from "../../lib/config/config.js";
import { TokenEnum } from "../../lib/enums/token.enum.js";

export default function getTokenExpiresIn(tokenType = TokenEnum.ACCESS_TOKEN) {
  return tokenType === TokenEnum.ACCESS_TOKEN
    ? config.jwt.accessExpiresIn
    : config.jwt.refreshExpiresIn;
}
