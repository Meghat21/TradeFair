const asyncHandler = require("../middleware/async");

const Venue = require("../models/venue");
const validationResult = require("express-validator").validationResult;

// @desc    Get venue
// @route   GET /api/v1/venue
exports.getVenues = async (req, res, next) => {
  try {
    const data = await Venue.find()
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries");
    res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get venue
// @route   GET /api/v1/venue/:id
exports.getVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findOne({ randomString: req?.params?.id });

    if (!venue) {
      return res.status(400).json({
        status: false,
        message: "No data found with given id",
      });
    }

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Post venue
// @route   POST /api/v1/venue/:id
exports.createVenue = async (req, res, next) => {
  try {
    const { userId } = req.userCredentials;
    let venue = await Venue.create({
      ...req.body,
      createdBy: userId,
    });

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Put venue
// @route   PUT /api/v1/venue/:id
exports.updateVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!venue) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No Venue found with given id!!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Venue updated successfully!!" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Delete venue
// @route   DELETE /api/v1/venue/:id
exports.deleteVenue = asyncHandler(async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return next(new ErrorResponse(`No venue with id of ${req.params.id}`));
    }

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
});
