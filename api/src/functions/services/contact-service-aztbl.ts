import { InvocationContext } from "@azure/functions";
import { Contact } from "../models/models";
import { TableEntity, getEntity, addEntity, updateEntity, deleteEntity, listEntities } from "../drivers/aztbl";

const tableName = "contacts";
const partitionKey = "contacts";

interface ContactEntity extends TableEntity {
  first_name: string;
  last_name: string;
  email: string;
  street_address: string;
  city: string;
  country: string;
  timestamp?: Date;
  etag?: string;
}

function contactToEntity(contact: Contact): ContactEntity {
  return {
    partitionKey: partitionKey,
    rowKey: contact.id,
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    street_address: contact.street_address,
    city: contact.city,
    country: contact.country,
  };
}

function entityToContact(entity: ContactEntity): Contact {
  return {
    id: entity.id,
    first_name: entity.first_name,
    last_name: entity.last_name,
    email: entity.email,
    street_address: entity.street_address,
    city: entity.city,
    country: entity.country,
  };
}

export async function getContacts(context: InvocationContext): Promise<Contact[]> {
  try {
    const entities = await listEntities<ContactEntity>(tableName, partitionKey);
    return entities.map(entityToContact);
  } catch (err) {
    context.log("Error reading contacts:", err);
    return []; // Return an empty array if there's an error
  }
}

export async function getContactById(id: string, context: InvocationContext): Promise<Contact | null> {
  try {
    const entity = await getEntity<ContactEntity>(tableName, partitionKey, id);
    return entity ? entityToContact(entity) : null;
  } catch (err) {
    context.log("Error getting contact by id:", err);
    return null;
  }
}

export async function addContact(contact: Contact, context: InvocationContext): Promise<Contact> {
  try {
    const newContact: Contact = {
      id: contact.id ?? crypto.randomUUID(),
      ...contact,
    };

    const contactEntity: ContactEntity = contactToEntity(newContact);
    await addEntity(tableName, contactEntity);

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
    const contact = await getEntity<ContactEntity>(tableName, partitionKey, id);
    if (!contact) {
      return null;
    }

    const updatedContact = { ...contact, ...contactUpdates };
    const contactEntity: ContactEntity = contactToEntity(updatedContact);
    await updateEntity(tableName, contactEntity);

    return updatedContact;
  } catch (err) {
    context.log("Error updating contact:", err);
    throw new Error("Failed to update contact");
  }
}

export async function deleteContact(id: string, context: InvocationContext): Promise<boolean> {
  try {
    await deleteEntity(tableName, partitionKey, id);
    context.log(`Contact with id ${id} deleted successfully.`);
    return true;
  } catch (err) {
    context.log("Error deleting contact:", err);
    throw new Error("Failed to delete contact");
  }
}
