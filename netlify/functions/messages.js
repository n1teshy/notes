import { Message } from "../models/message.js";
import { Conversation } from "../models/conversation.js";
import { onRequest } from "../utils/request.js";
import { MessageValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new MessageValidator();

exports.handler = async (req) => {
  try {
    await onRequest(req, true);
    const method = req.httpMethod;
    if (method === "GET") {
      let { timestamp, conversation } = req.queries;
      if (!conversation) {
        throw new AppError(statuses.NOT_FOUND, "Dat convo don't exist bro.");
      }
      if (timestamp === undefined || !/^\d+$/.test(timestamp)) {
        throw new AppError(
          statuses.BAD_REQUEST,
          "Nah, you gotta give a valid time fam."
        );
      }
      conversation = await Conversation.findOne({ _id: conversation });
      if (conversation.participants.indexOf(req.user.id) === -1) {
        throw new AppError(
          statuses.FORBIDDEN,
          "You ain't a part of dat convo bro, stop playin'."
        );
      }
      const messages = await Message.find({
        conversationId: conversation._id,
        timestamp: { $lt: new Date(Number(timestamp)) },
      }).limit(50);
      return makeResponse(messages.map((message) => message.toJSON()));
    } else if (method === "POST") {
      const errors = await validator.asyncValidate(req.body);
      if (errors) {
        return makeResponse(errors, statuses.UNPROCESSABLE);
      }
      const message = await Message.create(req.body);
      return makeResponse(message.toJSON());
    }
    return makeResponse(
      { message: "Nah son, wrong method." },
      statuses.BAD_REQUEST
    );
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
