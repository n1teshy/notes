import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

conversationSchema.methods.toJSON = async function () {
  this.participants = await User.find({ _id: { $in: this.participants } });
  return {
    id: this._id,
    participants: this.participants.map((p) => p.toJSON()),
  };
};

export const Conversation = mongoose.model("Conversation", conversationSchema);
