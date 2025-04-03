const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const SubscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    userPanel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);

module.exports = Subscribe;
