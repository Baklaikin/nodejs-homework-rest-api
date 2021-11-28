const { Contact } = require("../../schemas/schema");

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await Contact.findById(contactId);
  console.log(contact);
  if (contact) {
    res.status(200).json({ status: "success", code: 200, data: { contact } });
  } else {
    const error = new Error(`Contact with id:${contactId} is not found`);
    error.status = 404;
    throw error;
  }
};

module.exports = getById;
