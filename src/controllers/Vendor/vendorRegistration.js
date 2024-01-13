const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { otpModel } = require("../../models/Authentication/otp");
const { mailer } = require("../../utils/vendorEmail");
const authModel = require("../../models/Authentication/authenticationModel");
const ShopRegistration = require("../../models/ShopRegistration");
const { saveAccessTokenToCookie } = require("../../utils");

const vendorRegisteration = async (req, res) => {
  try {
    const { name, email, password, buisness } = req.body;

    const emailVerification = await authModel.findOne({ email });

    if (emailVerification) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const otp = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    await mailer(otp);
    const saveOtp = new otpModel({ email, otp });
    await saveOtp.save();
    return res.status(200).json({
      message: "OTP sent check mail",
    });
  } catch (error) {
    console.log(error?.message, "Thisis error inside catch ");
    return res.status(400).json({
      status: false,
      message: error?.message,
    });
  }
};
const vendorConfirmation = async (req, res) => {
  try {
    //check statys code for wrong otp
    const { name, email, password, otp } = req.body;
    const otpMongoose = await otpModel.find({ email, otp });
    console.log("THis is otp mongoose", otpMongoose);
    if (otpMongoose.length == 0) {
      return res.status(200).json({
        message: "Invalid otp",
      });
    }
    const permissions = ["READ", "EDIT"];
    const saveOtp = new authModel({ email, name, password, permissions });
    await saveOtp.save();
    return res.status(200).json({
      message: `User Registered successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await authModel
      .findOne({ email })
      .populate("role", ["role", "_id"]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `user with ${email} email does not exists`,
      });
    }

    if (user?.role?.role !== "VENDOR") {
      return res
        .status(400)
        .json({ status: false, message: "This section is only for vendor" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2hr" }
    );

    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);
    res.status(200).json({
      status: true,
      message: "Logged in successfully",
      user: {
        email: user?.email,
        name: user?.name,
        user,
        role: user?.role?.role || "",
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${err.message}`,
    });
  }
};
const vendorShop = async (req, res) => {
  try {
    let Shop = await ShopRegistration.find({
      _id: req?.userCredentials?.userId,
    });
    res.status(200).json({ status: "SUCCESS", Data: Shop });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${err.message}`,
    });
  }
};

module.exports = {
  vendorLogin,
  vendorShop,
  vendorRegisteration,
  vendorConfirmation,
};
