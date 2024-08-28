import CryptoJS from "crypto-js";

const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY as string;
const VECTOR_KEY = import.meta.env.VITE_VECTOR_KEY as string;

const key = CryptoJS.enc.Utf8.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Utf8.parse(VECTOR_KEY);

function encryptId(id: string): string {
  const encrypted = CryptoJS.AES.encrypt(id, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

function decryptId(encryptedId: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedId, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encryptId, decryptId };
