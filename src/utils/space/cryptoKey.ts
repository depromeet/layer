import CryptoJS from "crypto-js";

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY as string;
const VECTOR_KEY = import.meta.env.VITE_VECTOR_KEY as string;

const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Utf8.parse(VECTOR_KEY);

const encryptId = (id: string) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const word_array = CryptoJS.enc.Utf8.parse(encrypted.toString()); //UTF-8
  const encoding = CryptoJS.enc.Base64.stringify(word_array); //인코딩

  return encoding;
};

const decryptId = (encryptedId: string) => {
  const word_array = CryptoJS.enc.Base64.parse(encryptedId);
  const decoding = word_array.toString(CryptoJS.enc.Utf8);

  const decrypted = CryptoJS.AES.decrypt(decoding, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { encryptId, decryptId };
