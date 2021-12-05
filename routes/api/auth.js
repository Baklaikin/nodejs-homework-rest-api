const express = require("express");
const router = express.Router();
const { auth: ctrls } = require("../../controllers/index");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiRegisterSchema, joiLoginSchema } = require("../../schemas/users");

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrls.signup)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrls.login));

module.exports = router;
