import cacheClient from "../../lib/cache/init.js";
import { emailOTPExpiresIn } from "../../lib/constants/constants.js";
import { SendEmailEnum } from "../../lib/enums/send-email.enum.js";
import { sendEmailEvent } from "../../lib/mail/mail.js";
import { otpVerifyEmailKey } from "../cache/otpVerifyEmailKey.js";
import { getEmailTemplate } from "../email/get-email-template.js";

export default async function createOTP(
  { email, code, ttl = emailOTPExpiresIn },
  { emailType = SendEmailEnum.OTP.NEW_OTP },
) {
  const otp = await cacheClient.set(otpVerifyEmailKey(email), code, ttl);

  const emailTemplate = getEmailTemplate({ type: emailType, otp: code });

  sendEmailEvent.emit("send-email", {
    to: email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
  });
  return otp;
}
