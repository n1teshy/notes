import { onRequest } from "../utils/request.js";
import { Note } from "../models/note.js";
import { NoteValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new NoteValidator();

exports.handler = async (req) => {
  try {
    const method = req.httpMethod;
    if (new RegExp("/.netlify/functions/notes/?$").test(req.path)) {
      // /notes/ handler
      if (method !== "GET" && method !== "POST") {
        throw new AppError(statuses.BAD_REQUEST, `Nah bro, wrong method ${method}`);
      }
      await onRequest(req);
      if (method == "POST") {
        const errors = validator.asyncValidate(req.body);
        if (errors) {
          return makeResponse(errors, statuses.UNPROCESSABLE);
        }
        const note = await Note.create(req.body);
        return makeResponse(note.toJSON());
      }
      const notes = Note.find().skip(req.queries.skip ?? 0).limit(req.queries.limit ?? 20);
      return makeResponse(notes.map((note) => note.toJSON()));
    } else if (new RegExp("/.netlify/functions/notes/[a-f0-9]{24}/?$").test(req.path)) {
      // /notes/<id>/ handler
      return makeResponse({ message: "Not ready yet." })
    } else {
      throw new AppError(statuses.NOT_FOUND, "Naw son, dat path ain't here.");
    }
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
