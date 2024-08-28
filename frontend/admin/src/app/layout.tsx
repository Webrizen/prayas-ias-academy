import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/system/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { CookiesProvider } from 'next-client-cookies/server';
import { AuthProvider } from "@/contexts/AuthContext";
import Transition from "@/components/system/Transition";
import NextTopLoader from 'nextjs-toploader';

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
                <NextTopLoader
                  color="#2299DD"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                  template='<div class="bar" role="bar"><div class="peg"></div></div>'
                  zIndex={1600}
                  showAtBottom={false}
                />
                <Navbar />
                <Transition>{children}</Transition>
              </NextUIProvider>
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </CookiesProvider>
  );
}
