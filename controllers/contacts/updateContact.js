const { updateContact } = require("../../model/index");
const contactsScheme = require("../../schemas/schema");

const changeContact = async (req, res) => {
  const { body } = req;
  const { error } = contactsScheme.validate(body);
  if (error) {
    error.status = 400;
    error.message = "Missing fields";
    throw error;
  }
  const { contactId } = req.params;
  const updateContacts = await updateContact(contactId, body);
  if (updateContacts) {
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: updateContacts } });
  } else {
    res.status(404).json({ status: 404, message: "Not found" });
  }
};

module.exports = changeContact;
