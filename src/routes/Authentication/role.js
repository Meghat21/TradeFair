const express = require("express");
const router = express.Router();
const {
  getSingleRole,
  updateRole,
  fetchRoles,
  createRole,
  deleteRole,
} = require("../../controllers/Authentication/rolesController");
const { verifyUserTokenMiddleware } = require("../../middleware/verifyUser");
const { checkRole } = require("../../middleware/roleCheck");
router
  .route("/")
  .get(fetchRoles)
  .post(verifyUserTokenMiddleware, checkRole(), createRole);
router
  .route("/:id")
  .delete(verifyUserTokenMiddleware, checkRole(), deleteRole)
  .patch(verifyUserTokenMiddleware, checkRole(), updateRole)
  .get(verifyUserTokenMiddleware, checkRole(), getSingleRole);

module.exports = router;
