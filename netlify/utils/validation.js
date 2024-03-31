import { Note } from "../models/note.js";
import {
  BaseValidator,
  StringField,
} from "anubis-inspect";

export class NoteValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      title: new StringField("Title").test(async (title) => {
        const userExists = await Note.exists({ title });
        return [!userExists, "Bad news fam, you already done used this title."];
      }),
      content: new StringField("Content"),
    });
  }
}

