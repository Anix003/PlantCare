import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function FindUser(email, password, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();
    // console.log(`Loaded ${rows.length} rows from the sheet.`);

    const user = rows.find(
      (row) =>
        row.get("email").toLowerCase() === email.toLowerCase() &&
        row.get("password") === password
    ); 

    if (user) {
      return {
        id: user.get("id"), // Adjusting for zero-based index
        email: user.get("email"),
        fullName: user.get("fullName"),
        firstName: user.get("firstName"),
        lastName: user.get("lastName"),
        // password: user.get("password"),
        image: user.get("image"),
        // apiKey: user.get("apiKey") || '', // Add apiKey if available
      };
    }

    return null;
  } catch (err) {
    console.error("FindUser error:", err);
    return null;
  }
}

export async function FindEmail(email, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();
    // console.log(`Loaded ${rows.length} rows from the sheet.`);
    const user = rows.find(
      (row) => row.get("email").toLowerCase() === email.toLowerCase()
    );

    if (user) {
      return true; // Email exists
    }

    return false;
  } catch (err) {
    console.error("FindEmail error:", err);
    return null;
  }
}

export async function FindUserByEmail(email, sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();
    // console.log(`Loaded ${rows.length} rows from the sheet.`);
    const user = rows.find(
      (row) => row.get("email").toLowerCase() === email.toLowerCase()
    );

    if (user) {
      return user; // Return the user row
    }

    return false;
  } catch (err) {
    console.error("FindEmail error:", err);
    return null;
  }
}

// import { Document } from "@/lib/GoogleSpreadSheet";

// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// export async function FindUser(email, password) {
//   try {
//     const doc = await Document(SPREADSHEET_ID);
//     const sheet = await doc.sheetsByTitle("userdata"); // Adjust sheet name if different
//     const rows = await sheet.getRows();

//     // Map rows to desired format
//     const rowsData = rows.map(row => ({
//       email: row._rowData[1],
//       password: row._rowData[2],
//       id: row._rowNumber, // Assuming row number as ID
//     }));

//     // Find user by email and password
//     const user = rowsData.find(user => user.email === email && user.password === password);
//     return user || null;
//   } catch (err) {
//     console.error('Error:', err);
//     return null;
//   }
// }

//     return new Response(
//       JSON.stringify({ success: true, data: rowsData }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (err) {
//     console.error('Error:', err);
//     return new Response(
//       JSON.stringify({ success: false, message: err.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
