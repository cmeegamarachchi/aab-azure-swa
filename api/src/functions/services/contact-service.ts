import { InvocationContext } from "@azure/functions";
import { Contact } from "../models/models";

const fs = require("fs").promises;
const path = require("path");

export async function getContacts(context: InvocationContext): Promise<Contact[]> {
  try {
    const filePath = path.join(__dirname, "../data/contacts.json");
    const jsonString = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonString);

    // The JSON file contains a direct array of contacts, not an object with a contacts property
    return data as Contact[];
  } catch (err) {
    context.log("Error reading contacts file:", err);
    return []; // Return an empty array if there's an error
  }
}