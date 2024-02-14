import { User } from "../models/user.js";
import { onRequest } from "../utils/request.js";
import { LoginValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { encrypt } from "../utils/crypt.js";

const validator = new LoginValidator();

exports.handler = async (req) => {
  try {
    if (req.httpMethod === "POST") {
      await onRequest(req);
      const validatonErrors = await validator.asyncValidate(req.body);
      if (validatonErrors) {
        return makeResponse(validatonErrors, statuses.UNPROCESSABLE);
      }
      const user = await User.findOne({ username: req.body.username });
      return makeResponse({ token: encrypt(JSON.stringify(user.toJSON())) });
    }
    return makeResponse(
      { message: "Nah bro, wrong method." },
      statuses.BAD_REQUEST
    );
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
