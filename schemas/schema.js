const Joi = require('joi')
const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
})

module.exports = contactsScheme