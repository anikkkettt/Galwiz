const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ToolNoteBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },

    approved: {
      type: Boolean,
      default: false,
    },
    topic: {
      type: String,
      required: true,
    },
    subTopic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    noteBookLink: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    repoLink: {
      type: String,
    },
    like: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    discussion: [
      {
        type: Schema.ObjectId,
        ref: "discussion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ToolNoteBook = mongoose.model("ToolNoteBook", ToolNoteBookSchema);

module.exports = ToolNoteBook;
