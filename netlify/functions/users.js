import { User } from "../models/user.js";
import { makeResponse } from "../utils/response.js";
import { connectDB } from "../utils/db.js";

exports.handler = async (req) => {
  try {
    await connectDB();
    const users = await User.find();
    return makeResponse(users.map((user) => user.toJSON()));
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
