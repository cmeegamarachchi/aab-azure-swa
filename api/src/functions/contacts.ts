import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Contact } from "./models/models";

const fs = require("fs").promises;
const path = require("path");

export async function contacts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const contacts = await getContacts(context);  

  return { body: JSON.stringify(contacts), status: 200, headers: { "Content-Type": "application/json" } };
}

async function getContacts(context: InvocationContext): Promise<Contact[]> {
  try {
    const filePath = path.join(__dirname, "./data/contacts.json");
    const jsonString = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonString);
    return data.contacts as Contact[];
  } catch (err) {
    context.log("Error reading contacts file:", err);
    return []; // Return an empty array if there's an error
  }
}

app.http("contacts", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: contacts,
});
