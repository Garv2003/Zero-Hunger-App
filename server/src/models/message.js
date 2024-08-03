import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    users: Array,
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
