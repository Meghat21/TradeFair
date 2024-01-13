let Enquiry = require("../models/enquiry");
let Model = require(`../models/ShopRegistration`);

// @desc   create new enquiry
// @route   POST /api/v1/enquiry/:id
exports.newEnquiry = async (req, res) => {
  try {
    let initialEnqury = new Enquiry(req?.body);
    let savedData = await initialEnqury.save();
    await Model.findByIdAndUpdate(req?.params?.id, {
      $push: { enquiries: savedData._id },
    });
    res.status(200).json({
      status: "SUCCESS",
      msg: "enquiry Created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "SUCCESS",
      message: err?.message || "Internal server error",
    });
  }
};

// @desc delete query
// @route   POST /api/v1/enquiry/:id
exports.deleteEnquiry = async (req, res) => {
  try {
    let deletedData = await Enquiry.findOneAndDelete(req?.params?.id);
    if (!deletedData) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Enquiry data already deleted" });
    }
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Enquiry data deleted" });
  } catch (err) {
    res.status(400).json({
      status: "SUCCESS",
      message: err?.message || "Internal server error",
    });
  }
};

// @desc   Getting all existing query
// @route   POST /api/v1/enquiry/
exports.viewAllEnquiry = async (req, res) => {
  try {
    let allEnquiries = await Enquiry.find();
    res.status(200).json({ status: "SUCCESS", data: allEnquiries });
  } catch (err) {
    res.status(400).json({
      status: "SUCCESS",
      message: err?.message || "Internal server error",
    });
  }
};
