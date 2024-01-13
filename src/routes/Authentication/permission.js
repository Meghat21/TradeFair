const express = require("express");
const router = express.Router();
const {
  getSinglePermission,
  updatePermission,
  deletePermission,
  fetchPermissions,
  createPermission,
} = require("../../controllers/Authentication/permissionsController");
const { verifyUserTokenMiddleware } = require("../../middleware/verifyUser");
const { checkRole } = require("../../middleware/roleCheck");
router
  .route("/")
  .get(fetchPermissions)
  .post(verifyUserTokenMiddleware, checkRole(), createPermission);
router
  .route("/:id")
  .delete(verifyUserTokenMiddleware, checkRole(), deletePermission)
  .patch(verifyUserTokenMiddleware, checkRole(), updatePermission)
  .get(verifyUserTokenMiddleware, checkRole(), getSinglePermission);

module.exports = router;
