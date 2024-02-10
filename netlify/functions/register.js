import { User } from "../models/user.js";
import { onEvent } from "../utils/request.js";
import { RegistrationValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new RegistrationValidator();

exports.handler = async (event) => {
  try {
    await onEvent(event);
    const validationErrors = validator.asyncValidate(event.body);
    if (validationErrors) {
      return makeResponse(
        `is it null? ${validationErrors === null}`,
        statuses.UNPROCESSABLE
      );
    }
    await User.create(event.body);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
