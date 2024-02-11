import { Conversation } from "../models/conversation.js";
import { User } from "../models/user.js";
import {
  ArrayField,
  BaseValidator,
  BooleanField,
  StringField,
  NumberField,
} from "anubis-inspect";

export class RegistrationValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      username: new StringField("Username").test(async (username) => {
        const userExists = await User.exists({ username });
        return [!userExists, "Bad news fam, that username is already taken."];
      }),
      password: new StringField("Password"),
      firstName: new StringField("First name"),
      lastName: new StringField("Last name", false),
      age: new NumberField("Age").test((age) => {
        return [
          age <= 28,
          `Really bro? you ${age} years old 🙂?, I don't remember inviting a ${age} year old`,
        ];
      }),
      gender: new StringField("Gender").test((gender) => {
        return [
          ["M", "F", "O"].indexOf(gender) !== -1,
          `Nah fam, gender can only be male/female/others, not ${gender}.`,
        ];
      }),
    });
  }
}

export class LoginValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      username: new StringField("Username").test(async (username) => {
        const userExists = await User.exists({ username });
        return [
          userExists,
          "That username don't exist bro, might wanna register yourself ASAP.",
        ];
      }),
      password: new StringField("Password").test(
        async (password, [username]) => {
          const isValid = await User.exists({ username, password });
          return [isValid, "Wrong password, you amnesiac?"];
        },
        ["username"]
      ),
    });
  }
}

export class ConversationValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      participants: new ArrayField("Participants").test(
        async (participantIds) => {
          const participants = await User.find({
            _id: { $in: participantIds },
          });
          return [
            participantIds.length === participants.length,
            "A participant doesn't exist, I'll let you figure out which.",
          ];
        }
      ),
    });
  }
}

export class MessageValidator extends BaseValidator {
  constructor() {
    super();
    super.init({
      conversationId: new StringField("Conversation").test(async (convId) => [
        await Conversation.exists({ _id: convId }),
        "Nah, this conversation don't exist.",
      ]),
      content: new StringField("Content"),
    });
  }
}
