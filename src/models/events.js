const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventLogo: {
      type: {},
      required: [true, "Event logo is required!!"],


    },
    randomString: String,
    eventUrl: String,
    eventName: {
      type: String,
      required: true,
    },
    enquiries: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "enquiry" }],
    },
    venue: { type: mongoose.Schema.ObjectId, ref: "Venue" },
    category: [{ type: mongoose.Schema.ObjectId, ref: "category" }],
    ageGroup: {
      type: [String],
      enum: ["18-23", "24-35", "35-60", "60 and above"],
      required: [true, "Age Group is required"],
    },
    description: {
      type: String,
      required: false,
    },
    attendReason: {
      type: String,
      required: false,
    },
    termsConditions: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    eventBanner: {
      type: {},
      required: [true, "Event Banner is required"],
    },
    eventBrochure: {
      type: [{}],
      required: [true, "Event Brochure is required"],
    },

    website: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },

    shopDetails: [
      {
        shopName: {
          type: mongoose.Schema.ObjectId,
          ref: "shopRegistration",
        },
        gallery: [],
        hallNumber: {
          type: String,
        },
        stallNumber: {
          type: String,
        },
      },
    ],
    cycle: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "auth",
    },
    eventDate: {
      type: [Date],
      required: [true, "Event Date is required"],
    },
    organiser: [{ type: mongoose.Schema.ObjectId, ref: "organisers" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
