import { GenerateApiKey } from "@/services/GenerateApiKey";
import { FindUserByEmail } from "@/services/FindUser";
import { FetchApiKey } from "@/services/FetchApiKey";

export async function PUT(request) {
  try {
    // const res = await request.json();
    // const email = await request.get("email");
    // const id = await request.body.get("id");

    const { email, id } = await request.json();

    console.log("Generating API key for email:", email, "and id:", id);

    const user = await FindUserByEmail(email, "userdata");
    
    if (!user) {
      console.error("User not found for the given email.");
      return new Response("User not found", { status: 404 });
    }
    
    const apiKey = await GenerateApiKey();
    user.assign({
      apiKey: apiKey, 
      updatedAt: new Date().toISOString(),
    });
    await user.save();
    const apiData = await FetchApiKey(email, id, "userdata");
    // const apiData = {
    //   id: "my generated id", // Replace with actual ID logic if needed
    //   email: "My generated email", // Replace with actual email logic if needed
    //   apiKey: "my generated apiKey", // Replace with actual API key logic if needed
    //   createdAt: user.get("createdAt"),
    //   updatedAt: user.get("updatedAt")
    // };

    console.log("Fetched API key:", apiData);
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
