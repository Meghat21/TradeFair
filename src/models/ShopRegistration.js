const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopRegistration = new Schema(
  {
    shopName: {
      type: String,
      required: [true, " Shop name is required"],
    },
    randomString: String,
    shopUrl: String,
    logo: {
      type: {},
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    shopAddress: {
      type: String,
      required: [true, "Shop  Address is required"],
    },

    emailAddress: {
      type: String,
      required: [true, "Email is required"],
    },

    primaryPhoneNumber: {
      type: String,
      required: [true, "Primary Phone Number is required"],
    },
    secondaryPhoneNumber: {
      type: String,
    },

    otherPhoneNumber: {
      type: String,
    },

    linkedInUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },

    registrationDate: {
      type: String,
      required: [true, "Registration date is required"],
    },

    customization: {
      type: Boolean,
    },

    aboutUs: {
      type: String,
      required: [true, "About us required"],
    },
    bio: {
      type: String,
      required: [true, "bio", "Bio is required"],
    },

    keyPersonsDetails: [{}],

    majorCustomerBuyer: {
      name: String,
      image: [{}],
    },

    searchKeywords: [
      {
        type: String,
      },
    ],
    enquiries: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "enquiry" }],
    },
    importExport: {
      type: Boolean,
    },

    whatsappNo: {
      type: String,
    },

    pdfList: {
      type: [{}],
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "auth" },

    category: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "category" }],
    },
    productCategories: {
      type: [],
    },
    userId: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("shopRegistration", shopRegistration);
