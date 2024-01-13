const express = require("express");
const {
  ownerLogin,
  ownerShops,
} = require("../controllers/Authentication/ownerController");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const router = express.Router();

router.route("/login").post(ownerLogin);
router.route("/shop/:email").get(ownerShops);

module.exports = router;
