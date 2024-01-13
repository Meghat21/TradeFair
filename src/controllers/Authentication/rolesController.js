const roleModel = require("../../models/Authentication/roles");

// @desc  get roles
// @route   Get /api/v1/role
exports.fetchRoles = async (req, res) => {
  try {
    const existingRoles = await roleModel
      .find()
      .populate("createdBy")
      .populate("permissions", ["_id", "permission"]);
    const total = existingRoles?.length;

    res.status(200).json({
      status: "SUCCESS",
      total,
      data: existingRoles,
      message: "Data Found Successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  update roles
// @route   patch /api/v1/roles
exports.updateRole = async (req, res) => {
  try {
    const existingRoles = await roleModel.findById(req?.params?.id);

    if (!existingRoles) {
      res.status(400).json({
        status: "FAILURE",
        message: "No role data found with given Id",
      });
    }

    const updateRole = await roleModel.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
      },
      { new: true }
    );

    console.log(updateRole);
    res.status(200).json({
      status: "SUCCESS",
      updateRole,
      message: "Role Updated Successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, message: err?.message || "Internal Server Error" });
  }
};

// @desc  delete Role
// @route   delete /api/v1/role/:id
exports.deleteRole = async (req, res) => {
  try {
    const existingRole = await roleModel.findById(req?.params?.id);
    if (!existingRole) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No role data  found with given Id",
      });
    }
    await roleModel.findByIdAndDelete(req?.params?.id);
    res.status(200).json({
      status: "SUCCESS",
      message: "Role Deleted Successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  get single role
// @route   Get /api/v1/role/:id
exports.getSingleRole = async (req, res) => {
  try {
    const existingRole = await roleModel
      .findById(req?.params?.id)
      .populate("createdBy")
      .populate("permissions", ["_id", "permission"]);
    if (!existingRole) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No role data  found with given Id",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      data: existingRole,
      message: "Data Found Successfully",
    });
  } catch (err) {
    res.status(200).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  create  new role
// @route   post /api/v1/role/
exports.createRole = async (req, res) => {
  try {
    
    const role = await roleModel.create({
      ...req?.body,
      createdBy: req?.userCredentials?.userId,
    });

    console.log(role, "roleee");
    res.status(200).json({
      status: "SUCCESS",
      data: role,
      message: "Role Created Successfully",
    });
  } catch (err) {
    res.status(200).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};
