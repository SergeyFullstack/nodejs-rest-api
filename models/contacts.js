const fs = require("fs/promises");

const path = require("path");

const contactPath = path.join(__dirname, "/contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.find((el) => el.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return result;};

const addContact = async (body) => {
  
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    allContacts[index] = {id, ...body};
    await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
