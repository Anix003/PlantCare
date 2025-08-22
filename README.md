# Plant Disease Detection System

This is a [Next.js](https://nextjs.org) project for detecting plant diseases and pests using AI-powered analysis, integrated with Google Sheets and NextAuth.js.

## Features

- 🌱 AI-powered plant disease and pest detection
- 🔐 Google OAuth authentication with NextAuth.js
- 📊 Google Sheets integration for data management
- 🎨 Tailwind CSS styling
- 📱 Responsive design
- 🔄 Session management and protection

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google Sheets API
4. Go to "Credentials" and create OAuth 2.0 Client IDs
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
AUTH_KEY=your-auth-key
NEXT_PUBLIC_BASE_MODEL_URL=https://api.example.com/v1/models

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key
SPREADSHEET_ID=your-spreadsheet-id
```

You can generate a secret key using:
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation

### Endpoints

- `GET /` - Homepage
- `GET /health` - API health check
- `POST /detect` - Analyze plant image

### Example: Detect Plant Issues

Send a POST request to `/detect` with an image file:

```bash
curl -X POST -F "file=@plant.jpg" http://plantcare-ai.vercel.app/detect
```

### Response Format

```json
{
  "detected": true,
  "valid": true,
  "blurred": false,
  "obj": "plant",
  "issues": [
    {
      "type": "disease",
      "name": "Powdery Mildew",
      "confidence": 92,
      "description": "Fungal infection appearing as white powdery spots",
      "treatment": "Apply fungicide and improve air circulation",
      "bbox": [10, 20, 30, 40]
    }
  ],
  "processed_image": "data:image/jpeg;base64,..."
}
```

## Project Structure

```
v1.1/
├─ assets/
│  ├─ img/
│  └─ pdf/
├─ public/
│  ├─ img/
│  │  └─ image.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ apikey/
│  │  │  │  ├─ delete/
│  │  │  │  │  └─ route.js
│  │  │  │  ├─ generate/
│  │  │  │  │  └─ route.js
│  │  │  │  └─ route.js
│  │  │  ├─ auth/
│  │  │  │  ├─ [...nextauth]/
│  │  │  │  │  └─ route.js
│  │  │  │  └─ signup/
│  │  │  │     └─ route.js
│  │  │  ├─ check/
│  │  │  │  └─ route.js
│  │  │  ├─ detect/
│  │  │  │  └─ route.js
│  │  │  ├─ getdata/
│  │  │  │  └─ route.js
│  │  │  ├─ ready/
│  │  │  │  └─ route.js
│  │  │  └─ signup/
│  │  │     └─ route.js
│  │  ├─ dashboard/
│  │  │  └─ page.js
│  │  ├─ editor/
│  │  │  ├─ markdown/
│  │  │  │  └─ page.js
│  │  │  ├─ md/
│  │  │  │  └─ page.js
│  │  │  └─ page.jsx
│  │  ├─ health/
│  │  │  └─ page.jsx
│  │  ├─ home/
│  │  │  └─ page.js
│  │  ├─ login/
│  │  │  └─ page.js
│  │  ├─ playground/
│  │  │  └─ page.js
│  │  ├─ ready/
│  │  │  └─ page.jsx
│  │  ├─ signup/
│  │  │  └─ page.js
│  │  ├─ test/
│  │  │  └─ page.js
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.js
│  │  ├─ not-found.js
│  │  └─ page.js
│  ├─ components/
│  │  ├─ ui/
│  │  │  ├─ alert-dialog.jsx
│  │  │  ├─ alert.jsx
│  │  │  ├─ badge.jsx
│  │  │  ├─ button.jsx
│  │  │  ├─ card.jsx
│  │  │  └─ tooltip.jsx
│  │  ├─ AuthProvider.jsx
│  │  ├─ Footer.jsx
│  │  ├─ login.jsx
│  │  └─ Navbar.jsx
│  ├─ lib/
│  │  ├─ GoogleSheet.js
│  │  ├─ GoogleSpreadSheet.js
│  │  └─ utils.js
│  └─ services/
│     ├─ AddGoogleUser.js
│     ├─ AddNewUser.js
│     ├─ FetchApiKey.js
│     ├─ FetchCredentials.js
│     ├─ FindGoogleUser.js
│     ├─ FindUser.js
│     ├─ GenerateApiKey.js
│     ├─ GetLastRowIndex.js
│     └─ ValidateApiKey.js
├─ .env.example
├─ .env.local
├─ .gitignore
├─ components.json
├─ eslint.config.mjs
├─ jsconfig.json
├─ LICENSE
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
└─ README.md
```

## Pages

- `/` - Home page with information and links
- `/login` - Login page with Google sign-in button
- `/dashboard` - Protected dashboard page showing user information
- `/playground` - Test route for additional features

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in the Vercel dashboard and update the `NEXTAUTH_URL` to your production domain.
