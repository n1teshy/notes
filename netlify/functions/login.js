import { onRequest } from "../utils/request.js";
import { LoginValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new LoginValidator();

exports.handler = async (req) => {
  try {
    await onRequest(req);
    const validatonErrors = await validator.asyncValidate(req.body);
    if (validatonErrors) {
      return makeResponse(validatonErrors, statuses.UNPROCESSABLE);
    }
    return makeResponse({ message: "You in, bro." });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
