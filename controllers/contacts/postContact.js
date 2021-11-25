const { addContact } = require("../../model/index");
const postContact = async (req, res) => {
  const newContactData = req.body;
  console.log(newContactData);
  const addNewContact = await addContact(newContactData);
  res
    .status(201)
    .json({ status: "success", code: 201, data: { result: addNewContact } });
};

module.exports = postContact;
