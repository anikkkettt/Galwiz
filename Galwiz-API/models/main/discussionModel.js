const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const discussionSchema = new mongoose.Schema(
  {
    like: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    authorLike: {
      type: Boolean,
      default: false,
    },
    reply: [
      {
        type: Schema.ObjectId,
        ref: "discussionReply",
      },
    ],
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const discussion = mongoose.model("discussion", discussionSchema);

module.exports = discussion;
