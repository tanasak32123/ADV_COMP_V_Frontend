import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ชื่อแอปอะไรสักอย่าง",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <div className="min-h-[100dvh] relative pt-[62px] sm:pb-[30px] bg-[#36517C]" >{children}</div>
        <Footer />
      </body>
    </html>
  );
}
