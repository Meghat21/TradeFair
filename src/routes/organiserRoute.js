const express = require("express");
const router = express.Router();

// importing controller

const {
  createOrganiser,
  getOrganisers,
  updateOrganiser,
  getSingleOrganiser,
  deleteOrganiser,
} = require("../controllers/organiserController");
const { upload } = require("../configs/cloudinary");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const { checkRole } = require("../middleware/roleCheck");

router
  .route("/")
  .get(getOrganisers)
  .post(
    verifyUserTokenMiddleware,
    checkRole(),
    upload.fields([{ name: "logo", maxCount: 1 }, { name: "organiserImages" }]),
    createOrganiser
  );
router
  .route("/:id")
  .get(getSingleOrganiser)
  .delete(verifyUserTokenMiddleware, checkRole(), deleteOrganiser)
  .patch(
    verifyUserTokenMiddleware,
    checkRole(),
    upload.fields([{ name: "logo", maxCount: 1 }, { name: "organiserImages" }]),
    updateOrganiser
  );
module.exports = router;
// export default router;
