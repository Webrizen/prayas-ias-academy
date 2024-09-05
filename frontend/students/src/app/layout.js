import { Poppins, Unbounded } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/system/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Prayas IAS Academy",
    template: "%s | Prayas IAS Academy",
  },
  description: {
    default:
      "Prayas IAS Academy is a leading IAS coaching institute in Patna, dedicated to providing high-quality education and guidance for UPSC aspirants. With expert faculty, comprehensive study materials, and a proven track record of success, we help students achieve their dream of becoming civil servants.",
    template: "%s | Prayas IAS Academy",
  },
  applicationName: "Prayas IAS Academy",
  generator: "Prayas IAS Academy",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IAS coaching in Patna",
    "UPSC preparation",
    "Best IAS coaching Bihar",
    "UPSC coaching institute",
    "Civil Services Exam preparation",
    "IAS academy in Patna",
    "Top IAS coaching center",
    "UPSC exam tips",
    "Prayas IAS Academy",
    "BPSC coaching",
    "Patna IAS coaching",
    "IAS classes",
    "Civil Services coaching",
  ],
  authors: [
    { name: "Prayas IAS Academy", url: "https://prayasiasacademy.com" },
  ],
  publisher: "Prayas IAS Academy",
  metadataBase: new URL("https://prayasiasacademy.com"),
  openGraph: {
    title: "Prayas IAS Academy",
    description:
      "Prayas IAS Academy is a top-rated IAS coaching institute in Patna offering quality education, expert guidance, and comprehensive resources for UPSC aspirants.",
    url: "https://prayasiasacademy.com",
    siteName: "Prayas IAS Academy",
    images: [
      {
        url: "https://prayasiasacademy.com/logo.png",
        width: 500,
        height: 500,
        alt: "Prayas IAS Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },
  manifest: "https://prayasiasacademy.com/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Prayas IAS Academy",
    description:
      "Join Prayas IAS Academy in Patna to kickstart your journey to becoming an IAS officer with our experienced faculty, comprehensive courses, and a supportive learning environment.",
    creator: "@PrayasIAS",
    images: ["https://prayasiasacademy.com/logo.png"],
  },
  verification: {
    google: "google-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: ["support@prayasiasacademy.com", "prayasiasacademy.com"],
    },
  },
  category: "Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
