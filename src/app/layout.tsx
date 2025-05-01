import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar/Navbar";
import QueryProvider from "@/components/query-provider";
import mongoConnection from "@/lib/mongo";
import { APIProvider } from "@vis.gl/react-google-maps";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  mongoConnection();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {/* <Navbar /> */}
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
