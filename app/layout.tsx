/**
 * Root Layout Component
 *
 * This is the main layout component for the Next.js application.
 * It wraps all pages and provides common structure and styling.
 */

// Import the Metadata type from Next.js for page metadata
import type { Metadata } from "next";
// Import the Inter font that was configured in lib/fonts
import { inter } from "@/lib/fonts";
// Import global CSS styles
import "./globals.css";

/**
 * Metadata configuration for the application
 * This will be applied to all pages unless overridden
 */
export const metadata: Metadata = {
  title: "Campaing Manager",
  description: "Created with Next framework by Nacho with love",
};

/**
 * RootLayout Component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render within the layout
 * @returns {JSX.Element} The layout structure with proper HTML semantics
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/*
          The children prop represents the page content
          The Inter font is applied to all text
          antialiased class provides smoother font rendering
        */}
        {children}
      </body>
    </html>
  );
}
