import { connectDB } from "./db.js";

export async function onEvent(event) {
  event.body = JSON.stringify(event.body);
  await connectDB();
}
