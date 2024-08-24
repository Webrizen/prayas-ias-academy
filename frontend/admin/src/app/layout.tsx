import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/system/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { CookiesProvider } from 'next-client-cookies/server';
import { AuthProvider } from "@/contexts/AuthContext";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayas IAS Academy - Admin Panel",
  description: "Admin Panel for managing courses, instructors, categories, and student data at Prayas IAS Academy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={dmSans.className}>
          <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextUIProvider>
              <Navbar />
              {children}
            </NextUIProvider>
          </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </CookiesProvider>
  );
}
