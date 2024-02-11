import crypto from "crypto";

const secretKey = process.env.SECRET_KEY;

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  return (
    cipher.update(text, "utf8", "hex") +
    cipher.final("hex") +
    "." +
    iv.toString("hex")
  );
}

export function decrypt(encrypted) {
  try {
    const [enc, iv] = encrypted.split(".");
    if (enc === undefined || iv === undefined) {
      return null;
    }
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey, "hex"),
      Buffer.from(iv, "hex")
    );
    return decipher.update(enc, "hex", "utf8") + decipher.final("utf8");
  } catch (e) {
    return null;
  }
}
