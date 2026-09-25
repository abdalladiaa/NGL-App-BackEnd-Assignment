import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../../common/config/config.js";

export  function decryption(encryptedText) {
  return  CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY).toString(
    CryptoJS.enc.Utf8,
  );
}
