const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
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

module.exports = app;
