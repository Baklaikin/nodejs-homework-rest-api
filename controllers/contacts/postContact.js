const { addContact } = require('../../model/index')
const Joi = require('joi')
const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})

const postContact = async (req, res, next) => {
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
}

module.exports = postContact
