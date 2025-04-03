const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NodeBookSchema = new mongoose.Schema(
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
    notebookLink: {
      type: String,
    },
    githubLink: {
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

const NoteBook = mongoose.model("NoteBook", NodeBookSchema);

module.exports = NoteBook;
