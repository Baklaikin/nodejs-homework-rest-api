const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')

const contacts = path.resolve('./model/contacts.json')
// console.log(contacts)

const listContacts = async () => {
  const info = await fs.readFile(contacts)
  console.log('listcontacts has been executed')
  const allContacts = JSON.parse(info)
  console.table(allContacts)
  return allContacts
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contact = contactsList.find(person => person.id === parseInt(contactId))
  console.table(contact)
  if (contact) {
    return contact
  } else { return null }
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const contactToDelete = contactsList.find(person => person.id === parseInt(contactId))
  await contactsList.filter(contact => contact.id !== parseInt(contactId))
  console.table(contactToDelete)
  if (contactToDelete) {
    return contactToDelete
  } else {
    return null
  }
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
