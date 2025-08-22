import { FetchApiKey } from "@/services/FetchApiKey";

export async function GET(request) {
  try {
    const email = request.headers.get("email");
    const id = request.headers.get("id");

    console.log("Fetching API key for email:", email, "and id:", id);

    const apiData = await FetchApiKey(email, id, "userdata");

    console.log("Fetched API key...");
    // console.log("Fetched API key:", apiData);
    // if (!apiKey) {
    //   console.error("API key not found for the given email and id.");
    //   return new Response("API key not found", { status: 404 });
    // }

    return new Response(JSON.stringify({ success: true, data: apiData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch api key", { status: 500 });
  }
}
