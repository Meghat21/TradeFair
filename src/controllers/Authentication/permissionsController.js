const permissionModel = require("../../models/Authentication/permissions.js");

// @desc  get permissions
// @route   Get /api/v1/permissions
exports.fetchPermissions = async (req, res) => {
  try {
    const existingpermissions = await permissionModel
      .find()
      .populate("createdBy");
    const total = existingpermissions?.length;

    res.status(200).json({
      status: "SUCCESS",
      data: existingpermissions,
      total,
      message: "Data Found Successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  update permission
// @route   patch /api/v1/permission
exports.updatePermission = async (req, res) => {
  try {
    const existingPermission = await permissionModel.findById(req?.params?.id);

    if (!existingPermission) {
      res.status(400).json({
        status: "FAILURE",
        message: "No permission data found with given Id",
      });
    }

    const updatePermission = await permissionModel.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
      }
    );

    console.log("data", updatePermission);
    res.status(200).json({
      status: "SUCCESS",
      message: "Permission Updated Successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: err?.message || "Internal Server Error" });
  }
};

// @desc  delete Permission
// @route   delete /api/v1/permissions/:id
exports.deletePermission = async (req, res) => {
  try {
    const existingPermission = await permissionModel.findById(req?.params?.id);
    if (!existingPermission) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No permission data  found with given Id",
      });
    }
    await permissionModel.findByIdAndDelete(req?.params?.id);
    res.status(200).json({
      status: "SUCCESS",
      message: "Permission Deleted Successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  get single permission
// @route   Get /api/v1/permissions/:id
exports.getSinglePermission = async (req, res) => {
  try {
    const existingPermission = await permissionModel
      .findById(req?.params?.id)
      .populate("createdBy");
    if (!existingPermission) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No permission data  found with given Id",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      data: existingPermission,
      message: "Data Found Successfully",
    });
  } catch (err) {
    res.status(200).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  create  new permission
// @route   post /api/v1/permissions/
exports.createPermission = async (req, res) => {
  try {
    const permission = await permissionModel.create({
      ...req?.body,
      createdBy: req?.userCredentials?.userId,
    });

    res.status(200).json({
      status: "SUCCESS",
      data: permission,
      message: "Permission Created Successfully",
    });
  } catch (err) {
    res.status(200).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};
