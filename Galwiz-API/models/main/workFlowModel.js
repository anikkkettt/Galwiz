const mongoose = require("mongoose");

const WorkFlowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const WorkFlow = mongoose.model("WorkFlow", WorkFlowSchema);

module.exports = WorkFlow;
