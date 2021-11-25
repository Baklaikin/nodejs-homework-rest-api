const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
const contacts = path.resolve('./model/contacts.json')

const listContacts = async () => {
  const info = await fs.readFile(contacts)
  const allContacts = JSON.parse(info)
  return allContacts
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contact = contactsList.find(person => person.id.toString() === contactId)
  console.table(contact)
  if (contact) {
    return contact
  } else { return null }
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const contactToDelete = contactsList.find(person => person.id === contactId)
  await contactsList.filter(contact => contact.id !== contactId)
  console.table(contactToDelete)
  if (contactToDelete) {
    return contactToDelete
  } else {
    return null
  }
}

const addContact = async (body) => {
  const allContacts = await listContacts()
  const newContact = { id: v4(), ...body }
  const isInList = allContacts.find(contact => contact.phone === newContact.phone)
  if (isInList) {
    console.log('Contact is already in list')
    return
  };
  allContacts.push(newContact)
  await fs.writeFile(contacts, JSON.stringify(allContacts))
  console.table(newContact)
  return newContact
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const index = allContacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  allContacts[index] = { ...body }
  await fs.writeFile(contacts, JSON.stringify(allContacts))
  return allContacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
