const { getContactById } = require("../../model/index");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res
      .status(200)
      .json({ status: "success", code: 200, data: { ...contact } });
  } else {
    const error = new Error(`Contact with id:${contactId} is not found`);
    error.status = 404;
    throw error;
  }
};

module.exports = getById;
