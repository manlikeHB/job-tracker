const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: "HB <hb@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
