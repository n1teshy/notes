import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  return {
    id: this._id,
    username: this.username,
    name: `${this.firstName} ${this.lastName ? this.lastName : ""}`,
    age: this.age,
    gender: this.gender,
  };
};

export const User = mongoose.model("User", userSchema);
