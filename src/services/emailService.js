const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendOtpEmail = (email, result) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your account",
    text: `Your OTP code is ${result.otp_code}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendOtpEmail };
