let express = require("express");
const {
  viewAllEnquiry,
  newEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
let router = express.Router();

router.route("/").get(viewAllEnquiry);
router.route("/:id").delete(deleteEnquiry).post(newEnquiry);

module.exports = router;
