const {
  getRegistration,
  createRegistration,
  deleteRegistration,
  getSingleShopRegistration,
  updateShopRegistration,
  updateDynamicUrl,
} = require("../controllers/shopRegistration.js");

const { upload } = require("../configs/cloudinary");

const express = require("express");

const { verifyUserTokenMiddleware } = require("../middleware/verifyUser.js");
const { checkRole } = require("../middleware/roleCheck.js");
const {
  ownerSignup,
} = require("../controllers/Authentication/ownerController.js");
const router = express.Router();

router
  .route("/")
  .get(getRegistration)
  .post(
    verifyUserTokenMiddleware,
    upload.fields([{ name: "pdfList" }, { name: "shopLogo" }]),
    ownerSignup,
    createRegistration
  );

router
  .route("/:id")
  .delete(verifyUserTokenMiddleware, checkRole(), deleteRegistration)
  .get(getSingleShopRegistration)
  .patch(
    upload.fields([
      { name: "pdfList", maxCount: 3 },
      { name: "shopLogo", maxCount: 1 },
    ]),
    verifyUserTokenMiddleware,
    checkRole(),
    updateShopRegistration
  );

module.exports = router;
