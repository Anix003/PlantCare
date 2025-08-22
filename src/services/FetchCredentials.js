import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function FetchCredentials() {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = await doc.sheetsByTitle("userdata"); // Adjust sheet name if different
    // console.log(`Headers: ${sheet.headerValues}`);
    
    const rows = await sheet.getRows();
    // console.log(`Loaded ${rows.length} rows from the sheet.`);

    // Map rows to desired format
    const rowsData = rows.map(row => ({
      email: row.get("email"),
      password: row.get("password"),
      // Add other fields as needed
      id: `#${row._rowNumber}`
    }));

    return new Response(
      JSON.stringify({ success: true, data: rowsData }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}