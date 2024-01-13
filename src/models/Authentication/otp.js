const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    expiresAt: {
      type: Date,
      // required:[true,"Expiry Date of otp must be provided"]
    },
  },
  { timestamps: true, expireAfterSeconds: 10 }
);

// otpSchema.index({ expire_at: 1 }, { expireAfterSeconds: 2 });

const otpModel = mongoose.model("OTP", otpSchema, "otp");

module.exports = { otpModel };
