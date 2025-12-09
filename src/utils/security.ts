import CryptoJS from 'crypto-js';

// In a real production app, this key comes from .env variables
const SECRET_KEY = "SIH_HACKATHON_MASTER_KEY_2025"; 

export const encryptData = (text: string): string => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string): string => {
  if (!cipherText) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || "Tampered Data";
  } catch (error) {
    return "Decryption Failed";
  }
};