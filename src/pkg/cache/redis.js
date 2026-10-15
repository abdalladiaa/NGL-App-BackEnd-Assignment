import Redis from "ioredis";

export class RedisCacheProvider {
  client;
  constructor(redisConfig) {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
      lazyConnect: true,
      maxLoadingRetryTime: 3,
    });
    this.client.on("error", (err) => {
      console.log(err.message);
    });
    this.client.connect().catch((err) => console.log(err.message));
  }

async set(key, value, ttl) {
  if (!ttl) {
    return this.client.set(key, JSON.stringify(value));
  }

  return this.client.set(key, JSON.stringify(value), "EX", ttl);
}

  async get(key) {
    return this.client.get(key);
  }

  async del(key) {
    return this.client.del(key);
  }

  async ttl(key){
    return this.client.ttl(key)
  }
}
