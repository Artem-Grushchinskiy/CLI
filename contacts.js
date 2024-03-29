const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function writeContacts(contacts) {
  try {
    const data = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, data, "utf-8");
  } catch (error) {
    throw error;
  }
}

async function listContacts() {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContact(id) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((c) => c.id === id);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(id) {
  try {
    const contacts = await readContacts();
    const contactIndex = contacts.findIndex((c) => c.id === id);
    if (contactIndex === -1) {
      return null;
    }
    const removedContact = contacts.splice(contactIndex, 1)[0];
    await writeContacts(contacts);
    return removedContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  readContacts,
  writeContacts,
  listContacts,
  getContact,
  addContact,
  removeContact,
};
