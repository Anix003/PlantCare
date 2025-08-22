import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function FindGoogleUser( email, sheetName ) {
  try {
    // console.log("FindGoogleUser called.")
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();
    // console.log(`Loaded ${rows.length} rows from the sheet.`);
    
    const user = rows.find(row =>
      row.get("email").toLowerCase() === email.toLowerCase()
    );

    if (user) {
      return {
        id: user.get("id"),
        email: user.get("email"),
        fullName: user.get("fullName"),
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        // password: user.get("password"),
        image: user.get("image"),
        // apiKey: user.get("apiKey") || '', // Add apiKey if available
      };
    } else {
      console.log(`User with email ${email} not found.`);
    }

    return null;
  } catch (err) {
    console.error("FindUser error:", err);
    return null;
  }
}
