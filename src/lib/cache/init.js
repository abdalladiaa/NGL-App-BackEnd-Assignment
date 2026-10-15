import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import config from "../config/config.js";

const cacheClient = new RedisCacheProvider({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password || "",
});

export default cacheClient;
