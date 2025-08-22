import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function GET() {
  try {
    // Initialize document
    const doc = await Document(SPREADSHEET_ID);
    // console.log(`Loaded document: ${doc.title}`);
    const sheet = doc.sheetsByTitle["userdata"]; // Replace 'Sheet1' with your sheet name
    // const headers = sheet._worksheet; // Get headers
    // const sht = await sheet.loadCells(); // Load cells to access data
    // console.log(`Headers: ${sht}`);
    const rows = await sheet.getRows();
    console.log(`Loaded ${rows.length} rows from the sheet.`);
    rows.forEach((row, index) => {
      // console.log(`Row ${index + 1}:`, row._rawData);
      console.log(`Row ${index + 1} email:`, row.get("email")); // Example of accessing a cell value
      console.log(`Row ${index + 1} password:`, row.get("password")); // Example of accessing a cell value
    });
    // Map rows to desired format
    const rowsData = rows.map( row  => ({
      // console.log(`Row ${index + 1}:`, row._rawData);
      // return row._rawData[0]; // Adjust this to return the desired data
      id: row._rowNumber - 1, // Assuming row number as ID
      email: row._rawData[0],
      password: row._rawData[1],
      apiKey: row._rawData[2],
      createdAt: row._rawData[3],
      updatedAt: row._rawData[4],
    }));
    // Example of accessing a specific cell value
    // console.log(`First row data: ${JSON.stringify(rows)}`);
    // console.log(rows[0].get("email")); // Example of accessing a cell value
    return new Response(JSON.stringify({ success: true, data: rowsData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
}

// import { getGoogleSheetsClient } from '@/lib/GoogleSheets';

// // Helper function to parse features string into array
// function parseFeatures(featuresString) {
//   if (!featuresString) return [];

//   // Split by common delimiters and clean up
//   return featuresString
//     .split(/[,|\n|;]/) // Split by comma, newline, or semicolon
//     .map(feature => feature.trim()) // Remove whitespace
//     .filter(feature => feature.length > 0); // Remove empty strings
// }

// // Helper function to convert popular string to boolean
// function parsePopular(popularString) {
//   if (!popularString) return false;
//   return popularString.toLowerCase() === 'true';
// }

// export async function GET() {
//   try {
//     const sheetsClient = await getGoogleSheetsClient();
//     const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

//     const response = await sheetsClient.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: 'packages!A2:G', // Adjust sheet name if different
//     });

//     const rows = response.data.values || [];

//     const packages = rows.map(row => ({
//       name: row[0] || '',
//       price: row[1] || '',
//       description: row[2] || '',
//       features: parseFeatures(row[3]), // Convert string to array
//       popular: parsePopular(row[4]), // Convert string to boolean
//       color: row[5] || ''
//     }));

//     return new Response(
  //       JSON.stringify({ success: true, data: packages }),
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






// (S) => [
//   {
//     _worksheet: {
//       _spreadsheet: {
//         _rawProperties: [Object],
//         _spreadsheetUrl:
//           "https://docs.google.com/spreadsheets/d/15OjdmWy6w9v2sGjqPE7eWz6rrYuVSBZqgWi4xRqS1_M/edit",
//         _deleted: false,
//         spreadsheetId: "15OjdmWy6w9v2sGjqPE7eWz6rrYuVSBZqgWi4xRqS1_M",
//         auth: [JWT],
//         _rawSheets: [Object],
//         sheetsApi: [Function],
//         driveApi: [Function],
//       },
//       _headerRowIndex: 1,
//       _rawProperties: {
//         sheetId: 0,
//         title: "Sheet1",
//         index: 0,
//         sheetType: "GRID",
//         gridProperties: [Object],
//       },
//       _cells: [],
//       _rowMetadata: [],
//       _columnMetadata: [],
//       _rowCache: [`<2 empty items>`, [Circular * 1]],
//       _headerValues: ["email", "password", "apiKey", "createdAt", "updatedAt"],
//     },
//     _rowNumber: 2,
//     _rawData: ["example@gmail.com", "123", "jdsjkhadjasda", "time", "TIME"],
//     _deleted: false,
//   },
// ];