const { User } = require("../../schemas/users");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const passwordToCompare = bcrypt.compareSync(password, user.password);
  if (!passwordToCompare) {
    throw new Unauthorized("Email or password is wrong");
  } else if (!user.verify) {
    throw new Unauthorized("Email is not verified yet");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user,
    },
  });
};
module.exports = login;
