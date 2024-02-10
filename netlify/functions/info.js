import { connectDB } from "../utils/db.js";

exports.handler = async (event) => {
  try {
    await connectDB();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "connected to database" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
