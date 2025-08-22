import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function ValidateApiKey(apiKey, sheetName) {
  try {
    // Initialize document
    console.log("Initializing document from ValidateApiKey.js...");
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];

    // Fetch rows
    const rows = await sheet.getRows();

    // Find user
    const user = rows.find(
      (row) => row.get("apiKey") === apiKey
    );

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching api key:", error);
    return null;
  }
}
