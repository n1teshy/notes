import { User } from "../models/user.js";
import { BaseValidator, StringField, NumberField } from "anubis-inspect";

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
