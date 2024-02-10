import { connectDB } from "./db.js";

export async function onEvent(event) {
  event.body = JSON.parse(event.body);
  await connectDB();
}
