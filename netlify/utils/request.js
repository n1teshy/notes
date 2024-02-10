import { connectDB } from "./db.js";

export async function onRequest(event) {
  event.body = JSON.parse(event.body);
  await connectDB();
}
