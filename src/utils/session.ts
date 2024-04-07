import { createCipheriv, createHash } from "crypto";

const COOKIE_ID_TOKEN = 'IdToken';
const COOKIE_ID_CSRF = 'csrf';

const encryptToken = (text: string): string => {
  const key = createHash('sha256').update(process.env.CSRF_PRIVATE_KEY!).digest('base64').substring(0, 32);
  const cipher = createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

export {
  COOKIE_ID_TOKEN,
  COOKIE_ID_CSRF,
  encryptToken,
};