import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.index({ senderID: 1, receiverID: 1, message: 1 });

const Message = mongoose.model("Message", messageSchema);

export { Message };
