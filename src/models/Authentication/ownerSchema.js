const mongoose = require("mongoose");
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const jwt = require("jsonwebtoken");
const ownerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!!"],
    },
    mobileNumber: {
      type: String,
      reuired: [true, "Mobile number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// method for validating email
// vendorSchema.path("email").validate(function (email) {
//   if (!emailRegex.test(this.email)) {
//     throw new Error("Invalid email address");
//   }
//   return true; // Validation passed
// });

// method for hashing password
// vendorSchema.pre("save", async function (next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     return next(error);

//   }
// });

// //  method to compare hashed passwords during login
// vendorSchema.methods.comparePassword = async function (userPassword) {
//   return bcrypt.compare(userPassword, this.password);
// };

// // method for generating jwt token
// vendorSchema.methods.generateToken = function () {
//   return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//   });
// };

const ownerModel = mongoose.model("Owner", ownerSchema, "Owner");
module.exports = ownerModel;
