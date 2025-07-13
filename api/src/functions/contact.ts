import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContactById, addContact, updateContact, deleteContact } from "./services/contact-service";
import { Contact } from "./models/models";

export async function contact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

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

  try {
    const method = request.method.toUpperCase();
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/").filter((segment) => segment !== "");

    // Extract ID from URL path (e.g., /api/contact/123)
    const contactId = pathSegments[pathSegments.length - 1];
    const isIdProvided = contactId && contactId !== "contact";

    switch (method) {
      case "GET":
        if (isIdProvided) {
          // Get contact by ID
          const contact = await getContactById(contactId, context);
          if (!contact) {
            return {
              status: 404,
              body: JSON.stringify({ error: "Contact not found" }),
              headers: corsHeaders,
            };
          }
          return {
            status: 200,
            body: JSON.stringify(contact),
            headers: corsHeaders,
          };
        } else {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for GET requests" }),
            headers: corsHeaders,
          };
        }

      case "POST":
        // Add new contact
        const newContactData = (await request.json()) as Omit<Contact, "id">;

        // Validate required fields
        if (!newContactData.first_name || !newContactData.last_name || !newContactData.email) {
          return {
            status: 400,
            body: JSON.stringify({ error: "first_name, last_name, and email are required" }),
            headers: corsHeaders,
          };
        }

        const createdContact = await addContact(newContactData, context);
        return {
          status: 201,
          body: JSON.stringify(createdContact),
          headers: corsHeaders,
        };

      case "PUT":
        if (!isIdProvided) {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for PUT requests" }),
            headers: corsHeaders,
          };
        }

        const updateData = (await request.json()) as Partial<Omit<Contact, "id">>;
        const updatedContact = await updateContact(contactId, updateData, context);

        if (!updatedContact) {
          return {
            status: 404,
            body: JSON.stringify({ error: "Contact not found" }),
            headers: corsHeaders,
          };
        }

        return {
          status: 200,
          body: JSON.stringify(updatedContact),
          headers: corsHeaders,
        };

      case "DELETE":
        if (!isIdProvided) {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for DELETE requests" }),
            headers: corsHeaders,
          };
        }

        const deleted = await deleteContact(contactId, context);
        if (!deleted) {
          return {
            status: 404,
            body: JSON.stringify({ error: "Contact not found" }),
            headers: corsHeaders,
          };
        }

        return {
          status: 200,
          body: JSON.stringify({ message: "Contact deleted successfully" }),
          headers: corsHeaders,
        };

      default:
        return {
          status: 405,
          body: JSON.stringify({ error: "Method not allowed" }),
          headers: corsHeaders,
        };
    }
  } catch (error) {
    context.log("Error processing request:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal server error" }),
      headers: corsHeaders,
    };
  }
}

app.http("contact", {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  authLevel: "anonymous",
  handler: contact,
  route: "contact/{id?}",
});
