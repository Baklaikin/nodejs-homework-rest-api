const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const upload = require("./middlewares/upload");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/avatars", upload.single("image"), async (req, res) => {
  console.log(req.file);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(`${status}`).json({ message: err.message });
});

const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDMAIL_API_KEY } = process.env;
sgMail.setApiKey(SENDMAIL_API_KEY);
const email = {
  to: "xelew26603@unigeol.com",
  from: "baklaikin@gmail.com",
  subject: "Подтверждение почты",
  html: "<p>Mail check</p>",
};

sgMail
  .send(email)
  .then(() => console.log("Email sent successfully"))
  .catch((error) => console.log(error.message));
module.exports = app;
