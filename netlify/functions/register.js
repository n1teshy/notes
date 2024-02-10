import { User } from "../models/user.js";
import { onRequest } from "../utils/request.js";
import { RegistrationValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new RegistrationValidator();

exports.handler = async (req) => {
  try {
    await onRequest(req);
    const validationErrors = await validator.asyncValidate(req.body);
    if (validationErrors) {
      return makeResponse(validationErrors, statuses.UNPROCESSABLE);
    }
    const user = await User.create(req.body);
    return makeResponse(user.toJSON());
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
