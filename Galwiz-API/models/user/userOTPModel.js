const mongoose = require("mongoose");
const UserOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserOtp = mongoose.model("UserOtp", UserOtpSchema);

module.exports = UserOtp;
