const { contactsScheme } = require("../../schemas/schema");
const { Contact } = require("../../schemas/schema");

const patchContact = async (req, res) => {
  const { error } = contactsScheme.validate(req.body);
  if (error) {
    error.status = 400;
    error.message = "Missing fields";
    throw error;
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contactToUpdate = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  console.log(contactToUpdate);
  res.status(201).json({
    status: "success",
    code: 200,
    data: { result: contactToUpdate },
  });
};

module.exports = patchContact;
