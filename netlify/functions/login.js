import { onEvent } from "../utils/request.js";
import { LoginValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new LoginValidator();

exports.handler = async (event) => {
  try {
    await onEvent(event);
    const validatonErrors = await validator.asyncValidate(event.body);
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
