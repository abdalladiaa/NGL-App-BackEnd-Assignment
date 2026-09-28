import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../common/config/config.js";
import userError from "../../common/error/userErrors/userErrors.js";
import { logger } from "../../common/log/logger.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (err) {
    logger.error("Google token verification failed", {
      reason: "invalid_or_expired_google_id_token",
    });
    throw userError.invalidGoogleToken();
  }
};
