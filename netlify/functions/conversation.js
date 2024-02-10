import { Conversation } from "../models/conversation.js";
import { onEvent } from "../utils/request.js";
import { ConversationValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new ConversationValidator();

exports.handler = async (event) => {
  try {
    await onEvent(event);
    const validationErrors = await validator.asyncValidate(event.body);
    if (validationErrors) {
      return makeResponse(validationErrors, statuses.UNPROCESSABLE);
    }
    const conversation = await Conversation.create(event.body);
    return makeResponse(conversation.toJSON());
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
