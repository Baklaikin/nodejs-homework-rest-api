const { removeContact } = require("../../model/index");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await removeContact(contactId);
  if (contactToDelete) {
    res
      .status(200)
      .json({ status: "success", code: 200, message: "Contact is deleted" });
  } else {
    res.status(404).json({ status: 404, message: "Not found" });
  }
};

module.exports = deleteContact;
