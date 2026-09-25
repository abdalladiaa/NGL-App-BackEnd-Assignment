import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../../common/config/config.js";

export default function encryption(text) {
  return  CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}
