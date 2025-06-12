import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";



export const metadata: Metadata = {
  title: "RIPL",
  description: "THE BEST INTERIOR DESIGNER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body>
        <Navbar />
        <main className="pt-10"> {/* Add padding to account for fixed navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
