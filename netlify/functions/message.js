import { Conversation } from "../models/conversation.js";
import { onRequest } from "../utils/request.js";
import { MessageValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";

const validator = new MessageValidator();

exports.handler = async (req) => {
  try {
    const method = req.httpMethod;
    if (method === "GET") {
      const conversations = await Conversation.find();
      return makeResponse(conversations.map(async (c) => await c.toJSON()));
    }
    if (method === "POST") {
      await onRequest(req);
      const validationErrors = await validator.asyncValidate(req.body);
      if (validationErrors) {
        return makeResponse(validationErrors, statuses.UNPROCESSABLE);
      }
      const conversation = await Conversation.create(req.body);
      return makeResponse(conversation.toJSON());
    }
    return makeResponse(
      { message: "Nah bro, wrong method." },
      statuses.FORBIDDEN
    );
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
