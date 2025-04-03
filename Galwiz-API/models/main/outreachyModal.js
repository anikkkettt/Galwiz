const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const outreachySchema = new mongoose.Schema(
  {
    dateTitle: {
      type: String,
      required: true,
    },
    inter1: {
      name: { type: String },
      organization: { type: String },
      project: { type: String },
      photo: { type: String },
      conclusion: { type: String },
      mile: [
        {
          htmlData: { type: Schema.ObjectId, ref: "InterMileHtml" },
        },
      ],
    },
    inter2: {
      name: { type: String },
      organization: { type: String },
      project: { type: String },
      photo: { type: String },
      conclusion: { type: String },
      mile: [
        {
          htmlData: { type: Schema.ObjectId, ref: "InterMileHtml" },
        },
      ],
    },
    inter3: {
      name: { type: String },
      organization: { type: String },
      project: { type: String },
      photo: { type: String },
      conclusion: { type: String },
      mile: [
        {
          htmlData: { type: Schema.ObjectId, ref: "InterMileHtml" },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Outreachy = mongoose.model("Outreachy", outreachySchema);

module.exports = Outreachy;
