import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SchemeMate AI - Discover Government Schemes Instantly",
  description: "Answer a few simple questions and let AI instantly identify government schemes, subsidies, grants, and loans that match your profile.",
  keywords: "Government Schemes, Indian Subsidies, MSME Grants, Student Scholarships, Agriculture Schemes, PM-KISAN, MUDRA Loan, Scheme Eligibility, SchemeMate AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
