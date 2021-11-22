const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model/index')
const Joi = require('joi')

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts()
    res.status(200).json({ status: 'success', code: 200, data: { ...allContacts } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (contact) {
      res.status(200).json({ status: 'success', code: 200, data: { ...contact } })
    } else {
      const error = new Error(`Contact with id:${contactId} is not found`)
      error.status = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContactData = req.body
    const { error } = contactsScheme.validate(newContactData)
    if (error) {
      error.status = 400
      throw error
    }
    console.log(newContactData)
    const addNewContact = await addContact(newContactData)
    res.status(201).json({ status: 'success', code: 201, data: { result: addNewContact } })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
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
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body } = req
    const { error } = contactsScheme.validate(body)
    if (error) {
      error.status = 400
      error.message = 'Missing fields'
      throw error
    }
    const { contactId } = req.params
    const updateContacts = await updateContact(contactId, body)
    if (updateContacts) {
      res.status(200).json({ status: 'success', code: 200, data: { result: updateContacts } })
    } else {
      res.status(404).json({ status: 404, message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
