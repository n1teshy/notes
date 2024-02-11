import { makeResponse } from "../utils/response.js";

exports.handler = async (req, context) => {
  try {
    return makeResponse({ req, context });
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
