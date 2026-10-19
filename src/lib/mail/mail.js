import nodemailer from "nodemailer";
import config from "../../lib/config/config.js";
import transporter from "../config/mail.config.js";
import { EventEmitter } from "node:events";

export async function sendEmail({ to, subject, html } = {}) {
  await transporter.sendMail({
    from: `"NGL-App" <${config.nodeMailer.email}>`,
    to,
    subject,
    html,
  });
}


export const sendEmailEvent = new EventEmitter();

sendEmailEvent.on("send-email", async ({ to, subject, html }) => {
  await sendEmail({ to, subject, html });
});