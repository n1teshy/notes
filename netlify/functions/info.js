import { connectDB } from "../utils/db.js";

exports.handler = async (req, context) => {
  try {
    await connectDB();
    return {
      statusCode: 200,
      body: JSON.stringify({ req, context }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
