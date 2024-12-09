"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
