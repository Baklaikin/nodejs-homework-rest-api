const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("../app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
