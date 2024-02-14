import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isByGod: {
    type: Boolean,
    default: false,
  },
});

messageSchema.methods.toJSON = async function () {
  return {
    id: this._id,
    conversationId: this.conversationId,
    sender: this.sender,
    content: this.content,
    timestamp: this.timestamp,
    isByGod: this.isByGod,
  };
};

export const Message = mongoose.model("Message", messageSchema);
