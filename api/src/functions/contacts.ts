import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContacts } from "./services/contact-service";

export async function contacts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const contacts = await getContacts(context);

  return { body: JSON.stringify(contacts), status: 200, headers: { "Content-Type": "application/json" } };
}

app.http("contacts", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: contacts,
});
