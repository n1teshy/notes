import { makeResponse } from "../utils/response.js";

const data = { utc: null, indian: null };

exports.handler = async (req, context) => {
  try {
    if (data.utc === null) {
      const date = new Date();
      data.utc = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
      data.indian = date.toLocaleDateString("en-IN");
      return makeResponse({ message: "set" });
    }
    return makeResponse(data);
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
