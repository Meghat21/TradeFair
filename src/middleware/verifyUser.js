// ================================================Imports===================================================
const jwt = require("jsonwebtoken");
const authModel = require("../models/Authentication/authenticationModel");
// **********************************************************************************************************

exports.verifyUserTokenMiddleware = async (req, res, next) => {
  try {
    const cookies = req?.cookies;
    const access_token = cookies?.ACCESS_TOKEN;

    if (!access_token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Please Check Your Login Credentials",
      });
    }
    jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, user) => {
        if (error) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized! Please Check Your Login Credentials",
          });
        }
        const id = user?.id;

        const userIdentification = await authModel
          .findOne({
            _id: id,
          })
          .populate("permissions", ["permission", "_id"])
          .populate("role", ["role", "_id"])

          .select("-__v");

        const role = userIdentification?.role;
        const permissions = userIdentification?.permissions;

        let permissionArray = [];

        Array.isArray(userIdentification?.permissions) &&
          userIdentification?.permissions.length >= 1 &&
          userIdentification?.permissions?.forEach((item) => {
            permissionArray.push(item?.permission);
          });

        const userCredentials = {
          role: userIdentification?.role?.role || "",
          permissions: permissionArray,
          userId: id,
        };
        req.userCredentials = userCredentials;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
