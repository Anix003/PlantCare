import { Document } from "@/lib/GoogleSpreadSheet";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function GetLastRowIndex(sheetName) {
  try {
    const doc = await Document(SPREADSHEET_ID);
    const sheet = doc.sheetsByTitle[sheetName];
    const rows = await sheet.getRows();

    const lastRowNumber = rows.length + 1; // +1 because rows are 0-indexed, and first row is usually header
    console.log(`Last data row number: ${lastRowNumber}`);
    return rows.length + 1; // +1 because rows are 0-indexed, and first row is usually header
  } catch (err) {
    console.error("getLastRowIndex error:", err);
    return null;
  }
}
