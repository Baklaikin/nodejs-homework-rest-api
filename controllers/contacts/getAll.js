const { Contact } = require("../../schemas/schema");

const getAll = async (req, res) => {
  const allContacts = await Contact.find({});
  res.status(200).json({ status: "success", code: 200, data: { allContacts } });
};

module.exports = getAll;
