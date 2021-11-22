const { listContacts} = require('../../model/index')

const getAll = async (req, res, next) => {
  try {
    const allContacts = await listContacts()
    res.status(200).json({ status: 'success', code: 200, data: { ...allContacts } })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
