import { onRequest } from "../utils/request.js";
import { Note } from "../models/note.js";
import { NoteValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new NoteValidator();

exports.handler = async (req) => {
  try {
    const handler = handlers.find((item) => new RegExp(item[0]).test(req.path));
    if (handler === null) {
      throw new AppError(statuses.NOT_FOUND, "Naw son, dat path ain't here.");
    }
    await onRequest(req);
    return handler[1](req);
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};

async function notes(req) {
  const method = req.method;
  if (method !== "GET" && method !== "POST") {
    throw AppError(statuses.BAD_REQUEST, "Nah bro, wrong method");
  }
  if (method == "POST") {
    const errors = validator.asyncValidate(req.body);
    if (errors) {
      return makeResponse(errors, statuses.UNPROCESSABLE);
    }
    const note = await Note.create(req.body);
    return makeResponse(note.toJSON());
  }
  return makeResponse({ message: "we here" })
  const notes = Note.find().skip(req.queries.skip ?? 0).limit(req.queries.limit ?? 20);
  return makeResponse(notes.map((note) => note.toJSON()));
}

async function note(req) {
  return makeResponse({ message: "Not ready yet." })
}

const handlers = [
  ["/.netlify/functions/notes/?$", notes],
  ["/.netlify/functions/notes/[a-f0-9]{24}/?$", note],
]
