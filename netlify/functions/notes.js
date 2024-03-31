import { onRequest } from "../utils/request.js";
import { Note } from "../models/note.js";
import { NoteValidator } from "../utils/validation.js";
import { makeResponse, statuses } from "../utils/response.js";
import { AppError } from "../utils/error.js";

const validator = new NoteValidator();

exports.handler = async (req) => {
  try {
    const handler = handlers.find((item) => new RegExp(item[0]).test(req.path))
    if (handler !== null) {
      return await handler[1](req);
    } else {
      throw new AppError(statuses.NOT_FOUND, "Naw son, dat path ain't here.");
    }
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};

async function notes(req) {
  const method = req.httpMethod;
  if (method !== "GET" && method !== "POST") {
    throw new AppError(statuses.BAD_REQUEST, "Nah bro, wrong method");
  }
  await onRequest(req);
  if (method == "POST") {
    const errors = await validator.asyncValidate(req.body);
    if (errors) {
      return makeResponse(errors, statuses.UNPROCESSABLE);
    }
    const note = await Note.create(req.body);
    return makeResponse(note.toJSON());
  }
  const notes = await Note.find().skip(req.queries.skip ?? 0).limit(req.queries.limit ?? 20);
  return makeResponse(notes.map((note) => note.toJSON()));
}

async function note(req) {
  const method = req.httpMethod;
  if (method !== "GET" && method !== "PUT" && method !== "DELETE") {
    throw AppError(statuses.UNPROCESSABLE, "wrong method fam.")
  }
  await onRequest(req);
  const id = req.path.replace(/\/$/, "").split("/").at(-1);
  if (method === "GET") {
    const note = await Note.findById("66095a3f880088799806dcda");
    if (note) {
      return makeResponse(note.toJSON());
    }
    return makeResponse({ message: "Note not found" }, statuses.NOT_FOUND);
  } else if (method == "PUT") {
    const errors = await validator.asyncValidate(req.body);
    if (errors) {
      return makeResponse(errors, statuses.UNPROCESSABLE);
    }
    const updated = await Note.findByIdAndUpdate(id, req.body, { new: true });
    return makeResponse(updated.toJSON());
  }
  await Note.findOneAndDelete({ id: id });
  return makeResponse({ message: "deleted" })
}

const handlers = [
  ["/.netlify/functions/notes/?$", notes],
  ["/.netlify/functions/notes/[a-f0-9]{24}/?$", note],
]
