import { Message } from "../models/message.js";
import { Conversation } from "../models/conversation.js";
import { onRequest } from "../utils/request.js";
import { MessageValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new MessageValidator();

exports.handler = async (req) => {
  try {
    const method = req.httpMethod;
    if (method !== "GET" && method !== "POST") {
      throw new AppError(statuses.BAD_REQUEST, "Nah son, that method wrong.");
    }
    await onRequest(req, true);
    let conversation = req.queries.conversation;
    if (!conversation) {
      throw new AppError(
        statuses.NOT_FOUND,
        "You gotta give your convo ID bruh."
      );
    }
    conversation = await Conversation.findOne({ _id: conversation });
    if (!conversation) {
      throw AppError(statuses.NOT_FOUND, "Dat convo don't exist bro.");
    }
    if (conversation.participants.indexOf(req.user.id) === -1) {
      throw new AppError(
        statuses.FORBIDDEN,
        "You ain't a part of dat convo bro, stop playin'."
      );
    }
    if (method === "GET") {
      let timestamp = req.queries.timestamp;
      if (timestamp && !/^\d+$/.test(timestamp)) {
        throw new AppError(
          statuses.BAD_REQUEST,
          "Nah, you gotta give a valid time fam."
        );
      }
      const messages = await Message.find({
        conversationId: conversation._id,
        timestamp: {
          $lt: timestamp ? new Date(Number(timestamp)) : new Date().getTime(),
        },
      }).limit(50);
      return makeResponse(messages.map((message) => message.toJSON()));
    } else if (method === "POST") {
      const errors = await validator.asyncValidate(req.body);
      if (errors) {
        return makeResponse(errors, statuses.UNPROCESSABLE);
      }
      const message = await Message.create({
        ...req.body,
        conversationId: conversation._id,
        sender: req.user.id,
        timestamp: new Date(),
        isByGod: req.user.isGod,
      });
      return makeResponse(message.toJSON());
    }
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
