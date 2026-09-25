import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASS } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});
export async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: `"NGL-App" <${EMAIL}>`,
    to,
    subject,
    html,
  });
}
