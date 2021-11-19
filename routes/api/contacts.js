const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact } = require('../../model/index')

router.get('/', async (req, res, next) => {
  const allContacts = await listContacts()
  res.json({ status: 'success', code: 200, data: { ...allContacts } })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  console.log(contactId)
  const contact = await getContactById(contactId)
  if (contact) {
    res.json({ status: 'success', code: 200, data: { ...contact } })
  } else {
    res.json({ status: 404, message: 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ status: 404, message: 'Not found' })
})

router.delete('/:contactId', async (req, res, next) => {
  const contactToDelete = await removeContact()
  if (contactToDelete) {
    res.json({ status: 'success', code: 200, message: 'Contact is deleted' })
  } else {
    res.json({ status: 404, message: 'Not found' })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
