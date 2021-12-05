const express = require("express");
const router = express.Router();
const { contacts: ctrls } = require("../../controllers/index");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { contactsScheme } = require("../../schemas/schema");

const validationMiddleware = validation(contactsScheme);

router.get("/", auth, ctrlWrapper(ctrls.getAll));

router.get("/:contactId", ctrlWrapper(ctrls.getById));

router.post("/", auth, validationMiddleware, ctrlWrapper(ctrls.postContact));

router.delete("/:contactId", auth, ctrlWrapper(ctrls.deleteContact));

router.put(
  "/:contactId",
  auth,
  validationMiddleware,
  ctrlWrapper(ctrls.changeContact)
);

router.patch(
  "/:contactId/favorite",
  validationMiddleware,
  auth,
  ctrlWrapper(ctrls.patchContact)
);

module.exports = router;
