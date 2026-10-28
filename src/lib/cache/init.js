import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import config from "../config/config.js";

const cacheClient = new RedisCacheProvider({
  url:config.redis.url
});

export default cacheClient;
