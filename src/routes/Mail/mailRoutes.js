const express = require("express");
const {
  sendOtp,
  verifyOtp,
} = require("../../controllers/Mail/mailController.js");
// ----------------------------------------------------------------------------------------------------

const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router.route("/verifyOtp").post(verifyOtp);

module.exports = router;
