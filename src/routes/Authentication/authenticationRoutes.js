const express = require("express");
const {
  login,
  refreshToken,
  logout,
  register,
  resetPassword,
} = require("../../controllers/Authentication/authenticationControllers.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
// ---------------------------------------------------------------------------------------------------------------

const router = express.Router();
const { upload } = require("../../configs/cloudinary.js");
router.route("/login").post(login);
router.route("/register").post(upload.single("profilePic"), register);

router.route("/refresh").post(refreshToken);

router.route("/logout").post(verifyToken, logout);

router.route("/resetPassword").put(resetPassword);

module.exports = router;
