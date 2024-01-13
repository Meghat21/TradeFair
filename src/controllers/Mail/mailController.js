// ------------------------------------------Imports---------------------------------------------------------
const authModel = require("../../models/Authentication/authenticationModel.js");
const validator = require("validator");
const { generateOtp } = require("../../utils/index.js");
const { sendMail } = require("../../utils/sendMail.js");
const { otpModel } = require("../../models/Authentication/otp.js");
// -----------------------------------------------------------------------------------------------------------

// @desc - to send the otp to the specified email
// @route - POST /mail/sendOtp
// @access - PUBLIC
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();

    // deleting the expired otp
    await otpModel.deleteMany({ expiresAt: { $lt: currentDate } });

    const user = await authModel.find({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This mail does not exists" });
    }
    // otp - generating random otp
    const otp = generateOtp();
    sendMail(email, otp)
      .then(async () => {
        const otpDoc = await otpModel.findOneAndUpdate(
          { email },
          { otp, expiresAt: new Date(Date.now() + 60000) },
          { $new: true }
        );
        if (!otpDoc) {
          let doc = new otpModel({
            email,
            otp,
            expiresAt: new Date(Date.now() + 60000), //expiry time of otp 60s
          });
          doc.save().then(() => {
            return res
              .status(200)
              .json({ success: true, message: "OTP sent successfully" });
          });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: `Unable to send mail! ${error.message}`,
        });
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - to verify the otp sent to the specified email
// @route - POST /mail/verifyOtp
// @access - PUBLIC

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! Email is required" });
    }

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! OTP is required" });
    }

    otpDoc = await otpModel.findOne({ $and: [{ email }, { otp }] });

    if (!otpDoc) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is Incorrect" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();
    const otpExpiryDate = otpDoc.expiresAt;

    if (currentDate > otpExpiryDate) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is expired" });
    }

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
