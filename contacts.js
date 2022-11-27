const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join(__dirname, './db/contacts.json');

function writeNewContacts(data) {
  try {
    const normalizedContactsData = JSON.stringify(data);
    fs.writeFileSync(contactsPath, normalizedContactsData, 'utf8');
  } catch (error) {
    console.log(error);
  }
}

function listContacts() {
  try {
    const contacts = fs.readFileSync(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  return listContacts().find(({ id }) => id === contactId);
}

function removeContact(contactId) {
  const newContactsList = listContacts().filter(({ id }) => id !== contactId);
  writeNewContacts(newContactsList);
}

function addContact(name, email, phone) {
  const newContactsList = [
    ...listContacts(),
    { id: nanoid(), name, email, phone },
  ];
  writeNewContacts(newContactsList);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
