import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContacts } from "./services/contact-service";

export async function contacts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  // Handle preflight OPTIONS requests
  if (request.method.toUpperCase() === "OPTIONS") {
    return {
      status: 200,
      headers: corsHeaders,
    };
  }

  const contacts = await getContacts(context);

  return {
    body: JSON.stringify(contacts),
    status: 200,
    headers: corsHeaders,
  };
}

app.http("contacts", {
  methods: ["GET", "OPTIONS"],
  authLevel: "anonymous",
  handler: contacts,
});
