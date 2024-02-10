import { Conversation } from "../models/conversation.js";
import { onRequest } from "../utils/request.js";
import { ConversationValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new ConversationValidator();

exports.handler = async (req) => {
  try {
    await onRequest(req);
    const validationErrors = await validator.asyncValidate(req.body);
    if (validationErrors) {
      return makeResponse(validationErrors, statuses.UNPROCESSABLE);
    }
    const conversation = await Conversation.create(req.body);
    return makeResponse(conversation.toJSON());
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
