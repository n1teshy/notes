import { makeResponse } from "../utils/response.js";
import { MESSAGE } from "../utils/messages.js";

exports.handler = async (req, context) => {
  try {
    return makeResponse(req);
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
