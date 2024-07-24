// import { Note } from "../models/note.js";
import {
  BaseValidator,
  StringField,
} from "anubis-inspect";

export class NoteValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      title: new StringField("Title"),
      // .test(async (title) => {
      //   const noteExists = await Note.exists({ title });
      //   return [!noteExists, "Bad news fam, you already done used this title."];
      // }),
      content: new StringField("Content", false),
    });
  }
}

