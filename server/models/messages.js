const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "fromUser",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "toUser",
    },
    content: {
      type: String,
      trim: true,
    },
    new: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
