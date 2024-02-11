import { makeResponse } from "../utils/response.js";

const data = { data: null };

exports.handler = async (req, context) => {
  try {
    if (data.data === null) {
      const date = new Date();
      data.data = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
      return makeResponse({ message: "set" });
    }
    const copy = Object.assign({}, data);
    data.data = null;
    return makeResponse(copy);
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
