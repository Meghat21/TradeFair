const express = require("express");
const {
  createCategory,
  createProductCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  updateProductCategory,
  deleteProductCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { checkRole } = require("../middleware/roleCheck");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const router = express.Router();

// category route
router
  .route("/")
  .post(verifyUserTokenMiddleware, checkRole(), createCategory)
  .get(getCategory);
router
  .route("/:id")
  .get(getSingleCategory)
  .delete(verifyUserTokenMiddleware, checkRole(), deleteCategory);

// productCategory route
router
  .route("/:id")
  .post(verifyUserTokenMiddleware, checkRole(), createProductCategory);
// router.route('/:id/:productCategoryId').patch(updateProductCategory).delete(deleteProductCategory)
router
  .route("/:id")
  .patch(verifyUserTokenMiddleware, checkRole(), updateProductCategory)
  .delete(verifyUserTokenMiddleware, checkRole(), deleteProductCategory);

module.exports = router;
