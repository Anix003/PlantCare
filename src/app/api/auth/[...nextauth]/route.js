import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FindUser } from "@/services/FindUser";
import { FindGoogleUser } from "@/services/FindGoogleUser";
import { AddGoogleUser } from "@/services/AddGoogleUser";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // console.log("Google Profile Data: ", profile);
        // Fetch user data from Google
        const userData = await FindGoogleUser(profile.email, "userdata");
        // console.log("Returned user data: ", userData);
        // Convert userData to JSON format
        const user = JSON.parse(JSON.stringify(userData));
        // console.log("auth json user: ", user);
        
        if (user) {
          return user;
        } else {
          // console.log(`User with email ${profile.email} not found.`);
          // console.log("Adding user to the database...");
          // If user not found, add to the database
          const newUser = await AddGoogleUser(profile, "userdata");
          return newUser;
        }
      },
    }),
    // Add more providers here
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        // 🔐 Your DB/user lookup logic goes here
        const userData = await FindUser(email, password, "userdata");
        const user = JSON.parse(JSON.stringify(userData));
        // console.log("auth json user: ", user);
        if (user) {
          return user;
        }
        return null; // Invalid credentials
      },
    }),
  ],

  session: {
    strategy: "jwt", // or 'database' if using a DB session store
  },

  pages: {
    signIn: "/login", // Custom login page
    error: "/login", // Error page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user; // Store user info in token
      return token;
    },
    async session({ session, token }) {
      session.user = token.user || {};
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
