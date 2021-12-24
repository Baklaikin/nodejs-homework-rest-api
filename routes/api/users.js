const express = require("express");
const router = express.Router();
const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrls } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrls.getCurrent));

router.patch("/current/subscription", auth, ctrlWrapper(ctrls.subscription));

router.post("/avatars", upload.single("image"), async (req, res) => {
  console.log("file in router", req.file);
});

module.exports = router;
