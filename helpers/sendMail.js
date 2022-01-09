const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDMAIL_API_KEY } = process.env;

sgMail.setApiKey(SENDMAIL_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "baklaikin@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = sendMail;
