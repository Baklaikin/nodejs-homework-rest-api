const { Contact } = require("../../schemas/schema");

const postContact = async (req, res) => {
  const newContactData = req.body;
  const { _id } = req.user;
  const allContacts = await Contact.find({});

  const equalContact = allContacts.find(
    (contact) => Number(contact.phone) === Number(newContactData.phone)
  );
  if (equalContact) {
    console.log("Contact is already in list");
    res
      .status(400)
      .json({ status: "error", code: 400, data: { result: equalContact } });
    return;
  }
  const addNewContact = await Contact.create({ ...newContactData, owner: _id });
  res
    .status(201)
    .json({ status: "success", code: 201, data: { result: addNewContact } });
};

module.exports = postContact;
