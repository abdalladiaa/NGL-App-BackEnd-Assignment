import { OAuth2Client } from "google-auth-library";
import config from "../../lib/config/config.js";
import userError from "../../modules/user/user.error.js";
import { logger } from "../../pkg/log/logger.js";

const client = new OAuth2Client(config.google.clientId);

export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: config.google.clientId,
    });
    return ticket.getPayload();
  } catch (err) {
    logger.error("Google token verification failed", {
      reason: "invalid_or_expired_google_id_token",
    });
    throw userError.invalidGoogleToken();
  }
};
