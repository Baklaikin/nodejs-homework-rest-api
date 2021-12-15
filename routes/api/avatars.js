const express = require("express");
const router = express.Router();
const { joiRegisterSchema, joiLoginSchema } = require("../../schemas/users");
const { auth } = require("../../middlewares");
const { validation, ctrlWrapper } = require("../../middlewares");
const { avatars: ctrls } = require("../../controllers/index");

router.get("/:id", async (req, res) => {});
