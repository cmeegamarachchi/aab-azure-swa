import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContactById, addContact, updateContact, deleteContact } from "./services/contact-service"; // or ./services/contact-service-aztbl
import { Contact } from "./models/models";
import { withCors } from "./core";

export async function contactHandeller(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // CORS headers
  // Handle preflight OPTIONS requests
  if (request.method.toUpperCase() === "OPTIONS") {
    return {
      status: 200
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
              body: JSON.stringify({ error: "Contact not found" })
            };
          }
          return {
            status: 200,
            body: JSON.stringify(contact)
          };
        } else {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for GET requests" })
          };
        }

      case "POST":
        // Add new contact
        const newContactData = (await request.json()) as Contact;

        // Validate required fields
        if (!newContactData.first_name || !newContactData.last_name || !newContactData.email) {
          return {
            status: 400,
            body: JSON.stringify({ error: "first_name, last_name, and email are required" })
          };
        }

        const createdContact = await addContact(newContactData, context);
        return {
          status: 201,
          body: JSON.stringify(createdContact)
        };

      case "PUT":
        if (!isIdProvided) {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for PUT requests" })
          };
        }

        const updateData = (await request.json()) as Partial<Omit<Contact, "id">>;
        const updatedContact = await updateContact(contactId, updateData, context);

        if (!updatedContact) {
          return {
            status: 404,
            body: JSON.stringify({ error: "Contact not found" })
          };
        }

        return {
          status: 200,
          body: JSON.stringify(updatedContact)
        };

      case "DELETE":
        if (!isIdProvided) {
          return {
            status: 400,
            body: JSON.stringify({ error: "Contact ID is required for DELETE requests" })
          };
        }

        const deleted = await deleteContact(contactId, context);
        if (!deleted) {
          return {
            status: 404,
            body: JSON.stringify({ error: "Contact not found" })
          };
        }

        return {
          status: 200,
          body: JSON.stringify({ message: "Contact deleted successfully" })
        };

      default:
        return {
          status: 405,
          body: JSON.stringify({ error: "Method not allowed" })
        };
    }
  } catch (error) {
    context.log("Error processing request:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
}

app.http("contact", {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  authLevel: "anonymous",
  handler: withCors(contactHandeller),
  route: "contact/{id?}",
});

app.http("customer", {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  authLevel: "anonymous",
  handler: withCors(contactHandeller),
  route: "customer/{id?}",
});
