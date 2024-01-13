// ----------------------------------------------imports------------------------------------------------
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// -----------------------------------------------------------------------------------------------------

// sendMail - this method is used to send mail
exports.vendorMail = async (mailData) => {
  // transporter - configuration of admin/user to send mail from
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });

  const templatePath = path.join(__dirname, `../../views/loginDetails.ejs`);
  let email = mailData.email;
  let password = mailData.password;

  let data = await ejs.renderFile(templatePath, { email, password });

  //   mailOptions - details of the user to whom the mail needs to be delievered
  mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "Trade Fair India-Login Details",
    html: data,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Otp Sent Successfully" + info.response);
      }
    });
  });
};
