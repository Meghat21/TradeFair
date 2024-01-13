const ShopRegistration = require("../models/ShopRegistration");

exports.checkRole = () => {
  try {
    return async (req, res, next) => {
      let vendorCheck = false;

      if (
        req?.userCredentials &&
        req.userCredentials?.role == "VENDOR" &&
        req?.params?.id
      ) {
        const data = await ShopRegistration.findById(req?.params?.id);
        if (data?.createdBy == req?.userCredentials?.userId) {
          vendorCheck = true;
        }
      }

      if (
        (req?.userCredentials?.role && req.userCredentials?.role == "ADMIN") ||
        req.userCredentials?.role == "SUPER_ADMIN" ||
        vendorCheck
      ) {
        return next();
      }

      res.status(403).json({ status: false, message: "Access denied!!" });
    };
  } catch (err) {
    res
      .status(400)
      .json({
        status: false,
        message: err?.message || "Internal Server Error",
      });
  }
};
