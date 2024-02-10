import mongoose from "mongoose";

export async function connectDB() {
  const DTAABASE_URI = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.z0byrzc.mongodb.net/`;
  await mongoose.connect(DTAABASE_URI);
}
