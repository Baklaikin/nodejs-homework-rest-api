const getAll = require("./getAll");
const getById = require("./getById");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./updateContact");
const patchContact = require("./patchContact");

module.exports = {
  getAll,
  getById,
  postContact,
  deleteContact,
  changeContact,
  patchContact,
};
