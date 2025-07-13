import { InvocationContext } from "@azure/functions";
import { Contact } from "../models/models";

const fs = require("fs").promises;
const path = require("path");

const getFilePath = () => path.join(__dirname, "../data/contacts.json");

export async function getContacts(context: InvocationContext): Promise<Contact[]> {
  try {
    const filePath = getFilePath();
    const jsonString = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonString);

    // The JSON file contains a direct array of contacts, not an object with a contacts property
    return data as Contact[];
  } catch (err) {
    context.log("Error reading contacts file:", err);
    return []; // Return an empty array if there's an error
  }
}

export async function getContactById(id: string, context: InvocationContext): Promise<Contact | null> {
  try {
    const contacts = await getContacts(context);
    return contacts.find((contact) => contact.id === id) || null;
  } catch (err) {
    context.log("Error getting contact by id:", err);
    return null;
  }
}

export async function addContact(contact: Omit<Contact, "id">, context: InvocationContext): Promise<Contact> {
  try {
    const contacts = await getContacts(context);

    // Generate a new ID (simple approach - find max existing ID and increment)
    const maxId = contacts.reduce((max, c) => Math.max(max, parseInt(c.id) || 0), 0);
    const newContact: Contact = {
      ...contact,
      id: (maxId + 1).toString(),
    };

    contacts.push(newContact);
    await saveContacts(contacts, context);

    return newContact;
  } catch (err) {
    context.log("Error adding contact:", err);
    throw new Error("Failed to add contact");
  }
}

export async function updateContact(
  id: string,
  contactUpdates: Partial<Omit<Contact, "id">>,
  context: InvocationContext
): Promise<Contact | null> {
  try {
    const contacts = await getContacts(context);
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
      return null;
    }

    contacts[contactIndex] = { ...contacts[contactIndex], ...contactUpdates };
    await saveContacts(contacts, context);

    return contacts[contactIndex];
  } catch (err) {
    context.log("Error updating contact:", err);
    throw new Error("Failed to update contact");
  }
}

export async function deleteContact(id: string, context: InvocationContext): Promise<boolean> {
  try {
    const contacts = await getContacts(context);
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
      return false;
    }

    contacts.splice(contactIndex, 1);
    await saveContacts(contacts, context);

    return true;
  } catch (err) {
    context.log("Error deleting contact:", err);
    throw new Error("Failed to delete contact");
  }
}

async function saveContacts(contacts: Contact[], context: InvocationContext): Promise<void> {
  try {
    const filePath = getFilePath();
    const jsonString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(filePath, jsonString, "utf8");
  } catch (err) {
    context.log("Error saving contacts file:", err);
    throw new Error("Failed to save contacts");
  }
}
