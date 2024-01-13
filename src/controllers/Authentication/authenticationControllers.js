// ------------------------------------------Imports---------------------------------------------------------
const authModel = require("../../models/Authentication/authenticationModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { saveAccessTokenToCookie } = require("../../utils/index.js");
const {
  accessTokenValidity,
  refreshTokenValidity,
} = require("../../utils/index.js");
// -----------------------------------------------------------------------------------------------------------

// @desc - to fetch the users data
// @route - GET /auth/login
// @access - PUBLIC
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await authModel
      .findOne({ $or: [{ email: username }] })
      .populate("permissions", ["permission", "_id"])
      .populate("role", ["role", "_id"])
      .select("-__v"); //checking for the user in db

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Username/Email does not exists" });
    }

    if (user?.isUserActivate == "Deactivate") {
      return res.status(400).json({
        status: false,
        message:
          "This user is deactivated. Please contact Trade Fair India Administrators to activate this account.",
      });
    }
    let permissionArray = [];
    Array.isArray(user?.permissions) &&
      user?.permissions.length >= 1 &&
      user?.permissions?.forEach((item) => {
        permissionArray.push(item?.permission);
      });

    //matching password using bcrypt
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessTokenValidity }
    );

    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        userId: user._id,
        email: user?.email,
        name: user?.name,
        permissions: permissionArray,
        role: user?.role?.role || "",
        profilePic: user?.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};




exports.register = async (req, res) => {
  try {
    console.log(username);
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await authModel.create({ ...req?.body });

    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ status: false, message: err?.message });
  }
};

// @desc - to generate a new refresh token
// @route - POST /auth/refresh
// @access - PUBLIC
exports.refreshToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email ID is required to generate Refresh Token",
      });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email Does Not Exists" });
    }

    // clearing the existing cookie
    res.clearCookie("ACCESS_TOKEN");

    // refreshToken - generating a new refresh token with extended time
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: refreshTokenValidity }
    );

    // Saving refreshToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Refresh Token Generated",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// @desc - to fetch the users data
// @route - POST /auth/logout
// @access - PUBLIC
exports.logout = async (req, res) => {
  try {
    res.clearCookie("ACCESS_TOKEN");
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - to update the users password
// @route - PUT /auth/resetPassword
// @access - PRIVATE

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "FAILURE",
        status: "Email Id, Password and Confirm Password are required",
      });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exists" });
    }

    if (password.length < 10 || confirmPassword.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password must have length greater than or equal to 10",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { $new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
