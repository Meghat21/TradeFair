const mongoose = require("mongoose");
const organiserSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: [true, "Company Name is required"],
      // minLength : ['Must be 3 characters'],
      // maxLength : ['Must be 15 characters']
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "auth",
    },

    enquiries: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "enquiry" }],
    },
    randomString: String,
    organiserUrl: String,
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
      // minLength : ['Must be 3 characters'],
      // maxLength : ['Must be 25 characters']
    },
    state: {
      type: String,
      trim: true,
      required: [true, "State is required "],
      // minLength : ['Must be 3 characters'],
      // maxLength : ['Must be 10 characters']
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
      // minLength : ['Must be 3 characters'],
      // maxLength : ['Must be 10 characters']
    },
    contactPerson: [
      {
        contactPersonName: {
          type: String,
          // trim: true,
          // required: [true, "Name of Contact Person is required"],
          // minLength : ['Must be 3 characters'],
          // maxLength : ['Must be 20 characters']
        },
        contactNumber: {
          type: Number,
          // trim: true,
          // required: [true, "Contact Number is required"],
          // minLength: ["Must be 10 digits"],
          // maxLength: ["Must be 12 digits"],
        },
      },
    ],
    logo: {
      type: String,

      // required: [true, "Logo icon  is required"],
    },
    images: {
      type: [String],

      // required: [true, "Images is required"],
    },
    websiteUrl: {
      type: String,
      trim: true,
      required: [true, "Website Url is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      // unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email id",
      ],
    },
    insta: {
      type: String,
      trim: true,
      required: [true, "Instagram Url is required"],
    },
    fb: {
      type: String,
      trim: true,
      required: [true, "FaceBook Url is required"],
    },
    twitter: {
      type: String,
      trim: true,
      required: [true, "Twitter Url is required"],
    },
    linkedIn: {
      type: String,
      trim: true,
      required: [true, "LinkedIn Url is required"],
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: [true, "Phone Number is required"],
      minLength: ["Must be 10 digits"],
      maxLength: ["Must be 12 digits"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("organisers", organiserSchema);
