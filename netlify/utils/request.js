import { connectDB } from "./db.js";

export async function onRequest(req) {
  req.body = JSON.parse(req.body);
  req.queries = Object.fromEntries(
    "key=value&key2=value".split("&").map((query) => query.split("="))
  );
  await connectDB();
}
