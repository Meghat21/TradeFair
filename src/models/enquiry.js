let mongoose = require("mongoose");

let enquirySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is rewuired"],
    },
    number: {
      type: String,
      required: [true, "Mobile Number is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    query: {
      type: String,
      required: [true, "query field is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("enquiry", enquirySchema, "enquiry");
