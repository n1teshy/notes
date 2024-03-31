import { Note } from "../models/note.js";
import {
  ArrayField,
  BaseValidator,
  BooleanField,
  StringField,
  NumberField,
} from "anubis-inspect";

export class NoteValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      title: new StringField("Title").test(async (username) => {
        const userExists = await Note.exists({ title });
        return [!userExists, "Bad news fam, you already done used that title."];
      }),
      content: new StringField("Content"),
    });
  }
}

