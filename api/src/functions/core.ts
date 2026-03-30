import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export const withCors = (handler: (request: HttpRequest, context: InvocationContext) => Promise<HttpResponseInit>) => {
  return async function (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle OPTIONS preflight requests
    if (request.method === "OPTIONS") {
      return {
        status: 200,
        headers: corsHeaders,
        body: "",
      };
    }

    // Call the actual handler
    const response = await handler(request, context);

    // Merge CORS headers with the response headers
    return {
      ...response,
      headers: {
        ...(response.headers || {}),
        ...corsHeaders,
      },
    };
  };
};
