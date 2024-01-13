// @imporing functions/others
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const { checkRole } = require("../middleware/roleCheck");
const express = require("express");
const { upload } = require("../configs/cloudinary");

//@importing controllers
const {
  viewUsers,
  updateUsers,
  deleteUser,
  viewSingleUser,
  userStatus,
  createUser,
} = require("../controllers/usersControllers");

//@routr-section
const router = express.Router();

router
  .route("/")
  .get(viewUsers)
  .post(
    verifyUserTokenMiddleware,
    checkRole(),
    upload.single("profilePic"),
    createUser
  );
router
  .route("/:id")
  .patch(
    verifyUserTokenMiddleware,
    checkRole(),
    upload.single("profilePic"),
    updateUsers
  )
  .delete(verifyUserTokenMiddleware, checkRole(), deleteUser)
  .get(viewSingleUser);

router.route("/status/:id").patch(userStatus);

module.exports = router;
