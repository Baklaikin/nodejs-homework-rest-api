const express = require("express");
const router = express.Router();
const { contacts: ctrls } = require("../../controllers/index");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsScheme } = require("../../schemas/schema");

const validationMiddleware = validation(contactsScheme);

router.get("/", ctrlWrapper(ctrls.getAll));

router.get("/:contactId", ctrlWrapper(ctrls.getById));

router.post("/", validationMiddleware, ctrlWrapper(ctrls.postContact));

router.delete("/:contactId", ctrlWrapper(ctrls.deleteContact));

router.put(
  "/:contactId",
  validationMiddleware,
  ctrlWrapper(ctrls.changeContact)
);

router.patch(
  "/:contactId/favorite",
  validationMiddleware,
  ctrlWrapper(ctrls.patchContact)
);

module.exports = router;
