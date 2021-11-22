const { removeContact } = require('../../model/index')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactToDelete = await removeContact(contactId)
    if (contactToDelete) {
      res.status(200).json({ status: 'success', code: 200, message: 'Contact is deleted' })
    } else {
      res.status(404).json({ status: 404, message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
