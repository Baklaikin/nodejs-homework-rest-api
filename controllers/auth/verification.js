const User = require("../../schemas/users");
const sendMail = require("../../helpers");

const emailVerification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({
      message: "User is not found",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: "Verification is successful",
  });
};

const resendMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "The required email field is missing",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: `User ${email} is not found`,
    });
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const verificationToken = user.verificationToken;

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Confirm email</a>`,
  };

  await sendMail(mail);

  res.status(200).json({
    status: 200,
    message: "Verification email has been sent",
  });
};

module.exports = {
  emailVerification,
  resendMail,
};
