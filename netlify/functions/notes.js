import { onRequest } from "../utils/request.js";
import { NoteValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

// NOTE: Handler must only redirect the request to the right request handler

exports.handler = async (req) => {
  try {
    const method = req.httpMethod;
    if (method !== "GET" && method !== "POST") {
      throw new AppError(statuses.BAD_REQUEST, "Naw son, dat method wrong.");
    }
    await onRequest(req, true);
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};

async function notes() {

}

async function note() {

}
