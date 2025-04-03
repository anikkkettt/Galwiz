const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UseCaseSchema = new mongoose.Schema(
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
    photo: {
      type: String,
    },
    workflowLink: {
      type: String,
    },
    historyLink: {
      type: String,
    },
    notebookLink: {
      type: String,
    },
    repoLink: {
      type: String,
    },
    invForDiscussion: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UseCase = mongoose.model("UseCase", UseCaseSchema);

module.exports = UseCase;
