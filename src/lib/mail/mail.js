import nodemailer from "nodemailer";
import config from "../../lib/config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: config.nodeMailer.email,
    pass: config.nodeMailer.password,
  },
});
export async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: `"NGL-App" <${config.nodeMailer.email}>`,
    to,
    subject,
    html,
  });
}
