const mongoose = require("mongoose");
const { Schema } = mongoose;

const OtpSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("otp", OtpSchema);
