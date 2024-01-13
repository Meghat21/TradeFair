const express = require("express");
const {
  vendorRegisteration,
  vendorConfirmation,
  vendorLogin,
  vendorShop,
} = require("../../controllers/Vendor/vendorRegistration");
const { verifyUserTokenMiddleware } = require("../../middleware/verifyUser");
const { checkRole } = require("../../middleware/roleCheck");
const router = express.Router();
// category route
router.route("/login").post(vendorLogin);
router.route("/shop").get(vendorShop);

router.route("/confirmation").post(vendorConfirmation);

module.exports = router;
