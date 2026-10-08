import dotenv from "dotenv";

dotenv.config({ path: [`.${process.env.NODE_ENV}.env`] });

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";

export const EMAIL = process.env.EMAIL || "";
export const EMAIL_PASS = process.env.EMAIL_PASS || "";

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";
export const JWT_ACCESS_EXPIRES_IN = Number(process.env.JWT_ACCESS_EXPIRES_IN);
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
export const JWT_REFRESH_EXPIRES_IN = Number(
  process.env.JWT_REFRESH_EXPIRES_IN,
);

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";
export const SALT_ROUND = Number(process.env.SALT_ROUND) || 10;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASS = process.env.REDIS_PASS;
