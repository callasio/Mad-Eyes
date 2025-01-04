"use client";

import { Geist, Geist_Mono,Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { RecordingProvider } from "@/video/process";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // CSS 변수로 저장
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}>
        <RecordingProvider>
          <SessionProvider>{children}</SessionProvider>
        </RecordingProvider>
      </body>
    </html>
  );
}