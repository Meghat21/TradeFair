const Vendor = require("../../models/Authentication/ownerSchema");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const Shop = require("../../models/ShopRegistration");
const { generatePassword, saveAccessTokenToCookie } = require("../../utils");
const ShopRegistration = require("../../models/ShopRegistration");

exports.ownerSignup = async (req, res, next) => {
  try {
    const { emailAddress } = req?.body;
    let existingUser = await Vendor.findOne({ email: emailAddress });

    if (existingUser) {
      req.email = emailAddress;
      req.password = existingUser?.password;

      return next();
    }

    let initialPassword = generatePassword();

    let initialData = new Vendor({
      email: emailAddress,
      password: initialPassword,
    });
    const savedData = await initialData.save();

    req.email = req.body?.emailAddress;
    req.password = initialPassword;

    next();
  } catch (err) {
    return res.status(200).json({
      status: "SUCCESS",
      message: err?.message || "Internal server error",
    });
  }
};

exports.ownerLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    let existingData = await Vendor.findOne({ email });

    if (!existingData) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No user found with given email" });
    }
    let matchPassword = existingData?.password === password;
    if (!matchPassword) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Invalid Password!!" });
    }

    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: existingData._id,
        email: existingData?.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);
    res.status(200).json({
      status: "SUCCESS",
      message: "login successfully",
      data: existingData,
    });
  } catch (err) {
    return res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};

exports.ownerShops = async (req, res) => {
  try {
    let Shop = await ShopRegistration.find({
      emailAddress: req?.params?.email,
    });
    res.status(200).json({ status: "SUCCESS", Data: Shop });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};
