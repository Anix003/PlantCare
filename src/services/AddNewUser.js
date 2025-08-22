import { Document } from "@/lib/GoogleSpreadSheet";
import { GetLastRowIndex } from "@/services/GetLastRowIndex";
import { FindEmail } from "@/services/FindUser";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function AddNewUser(formData, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const lastRowIndex = await GetLastRowIndex("userdata"); // Get the last row index

    // Check if email already exists
    const emailExists = await FindEmail(formData.email, 'userdata');
    if (emailExists) {
      console.log(`User with email ${formData.email} already exists.`);
      return {
        userExists: true, // Indicate that this is not a new user
        message: "User with this email already exists. Please try a different email.",
      };
    }

    // Add new user to the sheet
    const user = await sheet.addRow({
      fullName: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email.toLowerCase(),
      password: formData.password,
      phone: formData.phone,
      company: formData.company,
      acceptMarketing: formData.acceptMarketing,
      apiKey: "", // Add apiKey if available
      id: `#${lastRowIndex}`, // Id will be set by the sheet
      userType: "custom", // Specify user type as Google
      // emailVerified: false, // Specify user type as Google
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // const user = await sheet.addRow({
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email.toLowerCase(),
    //   password: hashedPassword,
    //   phone: phone,
    //   company: company,
    //   acceptMarketing: acceptMarketing,
    //   apiKey: '', // Add apiKey if available
    //   password: '', // Password is not used for Google users
    //   id: lastRowIndex, // Id will be set by the sheet
    //   // image: profile.picture || '',
    //   // google_id: profile.sub, // Store Google ID for reference
    //   emailVerified: false, // Specify user type as Google
    //   usertype: 'custom', // Specify user type as Google
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    if (user) {
      return {
        id: user.get("id"),
        email: user.get("email"),
        password: user.get("password"),
        image: user.get("image"),
        fullName: user.get("fullName"),
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        message: "User added successfully",
        userExists: false, // Indicate that this is a new user
      };
    }

    console.log(`User with email ${profile.email} is not added.`);
    return null;
  } catch (err) {
    console.error("AddUser error:", err);
    return null;
  }
}
