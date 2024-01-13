// "use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_TYPE,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const mailer = async (otp) => {
  console.log("Inside mailer");
  //assumption is that mail is getting sent all the time so check it
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "amit967551@gmail.com", // sender address
    to: "amitbhandari@pearlorganisation.com", // list of receivers
    subject: "Hello  from amit✔", // Subject line
    text: otp.toString(), // plain text body
    html: otp.toString(), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

module.exports = { mailer };
