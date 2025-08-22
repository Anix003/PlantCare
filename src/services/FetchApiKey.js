import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function FetchApiKey(email, id, sheetName) {
  try {
    // Initialize document
    console.log("Initializing document from FetchApiKey.js...");
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    // console.log("Fetched sheet:", sheet);

    
    // Fetch rows
    const rows = await sheet.getRows();
    // console.log("Fetched rows from sheet:", rows.length);
    
    // rows.forEach((row, i) => {
    //   console.log(
    //     `Row ${i}:`,
    //     "Email:",
    //     row.get("email"),
    //     "ID:",
    //     row.get("id")
    //   );
    // });

    // Find user
    // console.log("Searching for user with email:", email, "and id:", id);
    const user = rows.find(
      (row) =>
        row.get("email").toLowerCase() === email.toLowerCase() &&
        row.get("id") === id
    );

    // console.log(
    //   "Fetched API Key user from FetchApiKey.js:",
    //   user ? user : "No user found"
    // );

    if (!user) {
      return null;
    }
    // console.log(
    //   "sending user data from FetchApiKey.js:",
    //   user.get("email"),
    //   user.get("apiKey")
    // );
    return {
      id: user.get("id"),
      email: user.get("email"),
      apiKey: user.get("apiKey") || "",
      createdAt: user.get("createdAt"),
      updatedAt: user.get("updatedAt"),
    };
  } catch (error) {
    console.error("Error fetching api key:", error);
    return null;
  }
}
