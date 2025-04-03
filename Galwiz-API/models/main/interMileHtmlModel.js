const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const InterMileHtmlSchema = new mongoose.Schema(
  {
    htmlData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InterMileHtml = mongoose.model("InterMileHtml", InterMileHtmlSchema);

module.exports = InterMileHtml;
