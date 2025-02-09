const { Contact } = require("../../schemas/schema");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.status(200).json({ status: "success", code: 200, data: { allContacts } });
};

module.exports = getAll;
