import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamp: true });

noteSchema.methods.toJSON = function () {
  return {
    id: this._id.toString(),
    title: this.title,
    content: this.content,
  };
};

export const Message = mongoose.model("Message", noteSchema);
