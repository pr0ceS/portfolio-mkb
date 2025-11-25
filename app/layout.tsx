import "../global.css";
import { Inter } from "next/font/google"; 
import LocalFont from "next/font/local";
import { ThemeProvider } from "./components/theme-provider"; 
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { LanguageProvider } from "./components/language-provider";

export const metadata: Metadata = {
  metadataBase: new URL('https://mkboz.com'),
  title: {
    default: "mkboz.com",
    template: "%s | mkboz.com",
  },
  description: "Portfolio of Mehmet Boz - Developer",
  openGraph: {
    title: "mkboz.com",
    description: "Portfolio of Mehmet Boz - Developer",
    url: "https://mkboz.com",
    siteName: "mkboz.com",
    images: [
      {
        url: "https://mkboz.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Mehmet Boz",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body className="bg-zinc-50 dark:bg-black transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}