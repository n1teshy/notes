import { connectDB } from "../utils/db.js";
import { makeResponse } from "../utils/response.js";

exports.handler = async (req, context) => {
  try {
    await connectDB();
    return {
      statusCode: 200,
      body: JSON.stringify({ req, context }, null, 2),
    };
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
