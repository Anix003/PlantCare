import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextAuth with Google Sheets",
  description: "Authentication app with Google Sheets integration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[inter] pt-16`}
      >
        <AuthProvider>
          {/* Navbar can be added here if needed */}
          <Navbar className="fixed top-0 w-full z-50" />
          {/* Main content area */}
          {children}
          {/* Footer can be added here if needed */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
