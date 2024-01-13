const Registration = require("../models/ShopRegistration.js");
const { vendorMail } = require("../utils/vendorMail.js");
const Category = require("../models/category.js");

// @desc   create new shop registration
// @route   POST /api/v1/shopRegistration
exports.createRegistration = async (req, res, next) => {
  try {
    console.log("hello")
    const { userId } = req.userCredentials;
    const { category, productCategories, searchKeywords, keyPersonsDetails } =
      req.body;
    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    if (!category || typeof category != "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "category field is required and Please stringify it!!",
      });
    }

    if (!productCategories || typeof productCategories != "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Product category field is required and please stringify it!!",
      });
    }
    if (!searchKeywords || typeof searchKeywords !== "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Search keywords field is required and Please stringify it!!",
      });
    }

    if (!keyPersonsDetails || typeof keyPersonsDetails !== "string") {
      return res.status(400).json({
        status: "FAILURE",
        message:
          "key person details field is required and Please stringify it!!",
      });
    }

    let parseCategoryData = JSON.parse(category);
    let parseProductCategory = JSON.parse(productCategories);
    let parseSearchKeyword = JSON.parse(searchKeywords);
    let parseKeyPersonsDetails = JSON.parse(keyPersonsDetails);

    // @@--------------------------------------------------------------@@End---------------------------------------------------

    const registrationData = new Registration({
      ...req?.body,
      createdBy: userId,
      searchKeywords: parseSearchKeyword,
      category: parseCategoryData,
      productCategories: parseProductCategory,
      keyPersonsDetails: parseKeyPersonsDetails,
      majorCustomerBuyer: {
        events: req?.body?.events,
        name: req?.body?.customerBuyerName,
      },
      pdfList: req?.files?.pdfList,
      logo: req?.files?.shopLogo?.[0],
    });

    let mailData = { email: req.email, password: req.password };
    vendorMail(mailData).then(async () => {
      await registrationData.save();
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "Shop Created Successfully" });
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get all shop registrations
// @route   POST /api/v1/shopRegistration
exports.getRegistration = async (req, res) => {
  try {
    const allRegistrations = await Registration.find()
      .populate("category")
      .populate("createdBy", ["_id", "name", "email"])
      .populate("productCategories")
      .populate("enquiries");

    return res.status(200).json({
      status: true,
      data: allRegistrations,
      total: allRegistrations.length,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  delete shop registration
// @route   Delete /api/v1/shopRegistration/:id
exports.deleteRegistration = async (req, res) => {
  try {
    const deletedData = await Registration.findByIdAndDelete(req?.params?.id);
    if (!deletedData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given Id!!" });
    }
    res.status(200).json({ status: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  get single shop registration data
// @route   get /api/v1/shopRegistration/:id
exports.getSingleShopRegistration = async (req, res) => {
  try {
    const singleShopData = await Registration.findOne({
      randomString: req?.params?.id,
    }).populate("category")
      .populate("createdBy", ["_id", "name", "email"])
      .populate("enquiries");

    if (!singleShopData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given id!!" });
    }
    res.status(200).json({ status: true, data: singleShopData });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  update  shop registration data
// @route  patch /api/v1/shopRegistration/:id
exports.updateShopRegistration = async (req, res) => {
  try {
    const { category, productCategories, searchKeywords, keyPersonsDetails } =
      req.body;

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    if (!category || typeof category != "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "category field is required and Please stringify it!!",
      });
    }

    if (!productCategories || typeof productCategories != "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Product category field is required and please stringify it!!",
      });
    }
    if (!searchKeywords || typeof searchKeywords !== "string") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Search keywords field is required and Please stringify it!!",
      });
    }

    if (!keyPersonsDetails || typeof keyPersonsDetails !== "string") {
      return res.status(400).json({
        status: "FAILURE",
        message:
          "key person details field is required and Please stringify it!!",
      });
    }

    let parseCategoryData = JSON.parse(category);
    let parseProductCategory = JSON.parse(productCategories);
    let parseSearchKeyword = JSON.parse(searchKeywords);
    let parseKeyPersonsDetails = JSON.parse(keyPersonsDetails);

    // @@--------------------------------------------------------------@@End---------------------------------------------------

    const updatedData = await Registration.findByIdAndUpdate(req?.params?.id, {
      ...req?.body,
      createdBy: userId,
      searchKeywords: parseSearchKeyword,
      category: parseCategoryData,
      productCategories: parseProductCategory,
      keyPersonsDetails: parseKeyPersonsDetails,
      majorCustomerBuyer: {
        events: req?.body?.events,
        name: req?.body?.customerBuyerName,
      },
      pdfList: req?.files?.pdfList,
      logo: req?.files?.shopLogo?.[0],
    });

    res.status(200).json({ status: true, data: "Updated successfully" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};
