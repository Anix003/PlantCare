# NextAuth with Google Sheets Integration

This is a [Next.js](https://nextjs.org) project with Google authentication and Google Sheets integration, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- 🔐 Google OAuth authentication with NextAuth.js
- 📊 Google Sheets integration
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

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
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

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.js    # NextAuth API route
│   ├── dashboard/page.js                   # Protected dashboard page
│   ├── login/page.js                      # Login page
│   ├── layout.js                          # Root layout with AuthProvider
│   └── page.js                            # Home page (redirects)
├── components/
│   ├── AuthProvider.jsx                   # Session provider wrapper
│   └── login.jsx                          # Login component
└── ...
```

## How It Works

1. **Authentication Flow**: Users can sign in with Google OAuth or traditional email/password
2. **Session Management**: NextAuth.js handles session management and token refresh
3. **Route Protection**: Dashboard and other protected routes redirect unauthenticated users to login
4. **Google Sheets Integration**: Ready for Google Sheets API integration with proper authentication

## Pages

- `/` - Home page that redirects to dashboard (if authenticated) or login
- `/login` - Login page with Google sign-in button
- `/dashboard` - Protected dashboard page showing user information

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in the Vercel dashboard and update the `NEXTAUTH_URL` to your production domain.
