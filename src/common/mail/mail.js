import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: `"NGL-App" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
}
