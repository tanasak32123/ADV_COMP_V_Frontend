import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ชื่อแอปอะไรสักอย่าง",
  description: "Lottery Application",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "./favicon.ico",
        href: "./favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "./favicon.ico",
        href: "./favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100dvh]`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
