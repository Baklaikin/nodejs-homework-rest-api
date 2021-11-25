const { listContacts } = require("../../model/index");

const getAll = async (req, res) => {
  const allContacts = await listContacts();
  res
    .status(200)
    .json({ status: "success", code: 200, data: { ...allContacts } });
};

module.exports = getAll;
