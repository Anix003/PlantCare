import { Document } from "@/lib/GoogleSpreadSheet";
import { GetLastRowIndex } from "@/services/GetLastRowIndex";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function AddGoogleUser(profile, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const lastRowIndex = await GetLastRowIndex("userdata"); // Get the last row index

    const user = await sheet.addRow({
      email: profile.email.toLowerCase(),
      password: "", // Password is not used for Google users
      apiKey: "", // Add apiKey if available
      fullName: profile.name || "",
      firstName: profile.given_name || "",
      lastName: profile.family_name || "",
      phone: "", // Phone is not provided by Google
      acceptMarketing: true, // Default value
      id: `#${lastRowIndex}`, // Id will be set by the sheet
      userType: "google", // Specify user type as Google
      image: profile.picture || "",
      googleId: profile.sub, // Store Google ID for reference
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
    }

    console.log(`User with email ${profile.email} is not added.`);
    return null;
  } catch (err) {
    console.error("AddUser error:", err);
    return null;
  }
}
