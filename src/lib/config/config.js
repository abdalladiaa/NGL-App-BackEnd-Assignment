import dotenv from "dotenv";

dotenv.config({ path: [`.${process.env.NODE_ENV}.env`] });

const config = {
  nodeMailer: {
    email: process.env.EMAIL || "",
    password: process.env.EMAIL_PASS || "",
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "",
    accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    refreshSecret: process.env.JWT_REFRESH_SECRET || "",
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  },
  encription: {
    key: process.env.ENCRYPTION_KEY || "",
    saltRound: Number(process.env.SALT_ROUND) || 10,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
  },
  redis: {
    host: process.env.REDIS_HOST || "",
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || "",
  },
};

export default config;
