import nodemailer from "nodemailer";
import config from "./config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: config.nodeMailer.email,
    pass: config.nodeMailer.password,
  },
});

export default transporter;
