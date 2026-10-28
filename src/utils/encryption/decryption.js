import CryptoJS from "crypto-js";
import config from "../../lib/config/config.js";

export function decryption(encryptedText) {
  return CryptoJS.AES.decrypt(encryptedText, config.encryption.key).toString(
    CryptoJS.enc.Utf8,
  );
}
