import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Initialize auth
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function Document( sheetId = process.env.SPREADSHEET_ID ) {
  try {
    // Initialize document
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    // Load the document
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error('Error loading Google Spreadsheet:', error);
    throw new Error('Failed to load Google Spreadsheet');
  }
}



