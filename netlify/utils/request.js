import { decrypt } from "./crypt.js";
import { connectDB } from "./db.js";

export async function onRequest(req) {
  req.body = JSON.parse(req.body);
  req.queries = Object.fromEntries(
    req.rawQuery.split("&").map((query) => query.split("="))
  );
  if (req.headers.authorization) {
    req.user = JSON.parse(decrypt(req.headers.authorization));
  }
  await connectDB();
}
