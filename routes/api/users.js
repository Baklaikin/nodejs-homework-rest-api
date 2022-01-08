const express = require("express");
const router = express.Router();
const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrls } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrls.getCurrent));

router.patch("/current/subscription", auth, ctrlWrapper(ctrls.subscription));

router.patch(
  "/avatars",
  upload.single("image"),
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrls.updateAvatar)
);

module.exports = router;
