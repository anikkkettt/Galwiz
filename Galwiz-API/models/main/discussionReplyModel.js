const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const discussionReplySchema = new mongoose.Schema(
  {
    like: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    reply: {
      type: String,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const discussionReply = mongoose.model(
  "discussionReply",
  discussionReplySchema
);

module.exports = discussionReply;
