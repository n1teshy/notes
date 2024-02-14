import { Conversation } from "../models/conversation.js";
import { onRequest } from "../utils/request.js";
import { ConversationValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new ConversationValidator();

exports.handler = async (req) => {
  try {
    const method = req.httpMethod;
    if (method !== "GET" && method !== "POST") {
      throw new AppError(statuses.BAD_REQUEST, "Nah cuh, wrong method.");
    }
    await onRequest(req, true);
    if (method === "GET") {
      const convos = await Conversation.find({
        participants: { $elemMatch: { _id: req.user.id } },
      });
      return makeResponse(convos.map(async (c) => await c.toJSON()));
    }
    const validationErrors = await validator.asyncValidate(req.body);
    if (validationErrors) {
      return makeResponse(validationErrors, statuses.UNPROCESSABLE);
    }
    const conversation = await Conversation.create(req.body);
    return makeResponse(await conversation.toJSON());
  } catch (error) {
    throw error;
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
