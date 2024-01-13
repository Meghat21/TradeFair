// ================================================Imports===================================================
const jwt = require("jsonwebtoken");
// **********************************************************************************************************

exports.verifyToken = (req, res, next) => {
  try {
    const cookies = req?.cookies;
    const access_token = cookies?.ACCESS_TOKEN;

    if (!access_token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Please Check Your Login Credentials",
      });
    }

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized! Please Check Your Login Credentials",
        });
      }
      next();
    });
  } catch (error) {
    res?.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
