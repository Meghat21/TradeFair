// validities
exports.accessTokenValidity = "15m";
exports.refreshTokenValidity = "15d";
// ----------------------------------------------------------------------------------------

// httpOnlyCookieValidity - setting the validity for http only cookie
const httpOnlyCookieValidity = () => {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days validity
};

// saveAccessTokenToCookie - this method saved the access token to the http only cookie
exports.saveAccessTokenToCookie = (res, token) => {
  return res.cookie("ACCESS_TOKEN", token, {
    httpOnly: true,
    expires: httpOnlyCookieValidity(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};

// -----------------------------------------------------------------------------------------------------

// generateOtp - method to generate random 6 digit otp
exports.generateOtp = () => {
  const otp = Math.floor(Math.random() * 900000 + 100000);
  return otp;
};

// generate 8 charcter long password
exports.generatePassword = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};
// -----------------------------------------------------------------------------------------------------
