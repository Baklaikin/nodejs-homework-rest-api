const express = require("express");
const router = express.Router();
const { auth, ctrlWrapper } = require("../../middlewares");
const { users: ctrls } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrls.getCurrent));

router.patch("/current/subscription", auth, ctrlWrapper(ctrls.subscription));

module.exports = router;
