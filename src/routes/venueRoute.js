const express = require("express");
const {
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueContorller");

const venue = require("../models/venue");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const { checkRole } = require("../middleware/roleCheck");

// router.use(protect)
// router.use()

router.route("/").get(advancedResults(venue), getVenues).post(createVenue);

router
  .route("/:id")
  .get(getVenue)
  .put(verifyUserTokenMiddleware, checkRole(), updateVenue)
  .delete(verifyUserTokenMiddleware, checkRole(), deleteVenue);

module.exports = router;
