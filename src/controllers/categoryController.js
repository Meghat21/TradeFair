const categoryModel = require("../models/category");

// ---------------------------------createCategory-------------------------------------------
const createCategory = async (req, res) => {
  try {
    const { category, productCategories } = req.body;

    let data = new categoryModel({
      category: category,
      productCategories: productCategories,
    });
    const savedData = await data.save();
    res.status(201).json({
      status: "SUCCESS",
      message: "Category is created successfully",
      data: savedData,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ status: "FAILURE", error: err?.message });
  }
};
// ----------------------------------getCategory-------------------------------------------------
const getCategory = async (req, res) => {
  try {
    let data = await categoryModel.find();
    console.log("hello");
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Lists of category", data: data });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// ---------------------------------getSingleCategory-------------------------------------------
const getSingleCategory = async (req, res) => {
  try {
    let data = await categoryModel.findById(req?.params?.id);
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Particular category data",
      data: data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------updateCategory----------------------------------------------
const updateCategory = async (req, res) => {
  try {
    let data = await categoryModel.findByIdAndUpdate(
      { _id: req?.params?.id },
      { $set: { category: req?.body?.category } },
      { new: true }
    );
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Category is updated successfully",
      data: data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "FAILURE",
      error: error?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------------deleteCategory-----------------------------------
const deleteCategory = async (req, res) => {
  try {
    let data = await categoryModel.findByIdAndDelete(req?.params?.id);
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Category Data is deleted successfully",
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------createProductCategory------------------------------------------------

const createProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.id;
    let existingData = await categoryModel.findById(productCategoryId);
    let data = await categoryModel.findByIdAndUpdate(
      { _id: productCategoryId },
      {
        $push: { productCategories: req?.body?.productCategories },
      },
      { new: true }
    );
    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(201).json({
      status: "SUCCESS",
      message: "Product Category is created successfully",
      data: data,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ---------------------------------------updateProductCategory------------------------------------



const updateProductCategory = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let data = await categoryModel.findByIdAndUpdate(
      {
        _id: req?.params?.id,
      },

      {
        category: req.body.category,
        productCategories: req.body.productCategories,
      },

      { new: true }
    );
    res.status(200).json({
      status: "SUCCESS",
      message: "Product Category is updated successfull",
      data: data,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ------------------------------------------deleteProductCategory---------------------------------------

const deleteProductCategory = async (req, res) => {
  try {
    // let flag = false
    let data = await categoryModel.findByIdAndUpdate(
      { _id: req?.params?.id },
      { $pull: { productCategories: { _id: req?.params?.productCategoryId } } }
    );
    //     if (data && data.productCategories) {
    //       data.productCategories.forEach((ele) => {
    //         console.log(
    //           "ele",
    //           ele._id.toString(),
    //           "params",
    //           req?.params?.productCategoryId
    //         );
    //         let idValue = ele._id.toString();
    //         if (idValue !== req?.params?.productCategoryId) {
    //             flag = true
    //         }
    //         return

    //     });

    // }
    // console.log("flag" , flag)
    // if(flag === true){
    //     flag = false
    //     return res
    //       .status(400)
    //       .json({
    //         status: "FAILURE",
    //         message: "No data is found with given id!!",
    //       });

    // }
    res.status(200).json({
      status: "SUCCESS",
      message: "Product Category Data is deleted successfully",
    });
    // if(!data?.){
    //     return res.status(400).json({status : "FAILURE" ,message : "No data is found with given id!!" })
    //  }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createCategory,
  createProductCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  updateProductCategory,
  deleteProductCategory,
  deleteCategory,
};
