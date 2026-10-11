import CryptoJS from "crypto-js";
import config from "../../lib/config/config.js";

export default function encryption(text) {
  return CryptoJS.AES.encrypt(text, config.encription.key).toString();
}
