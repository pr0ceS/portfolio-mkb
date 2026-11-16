import "../global.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./components/language-provider";
import { Analytics } from "./components/analytics";
import { Navigation } from "./components/nav";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mkboz.com"),
  title: { default: "Mehmet Boz | AI Software Engineer", template: "%s | Mehmet Boz" },
  description: "Mehmet Boz, AI software engineer from Enschede. I design and build AI applications and agents, from the first idea to production.",
  openGraph: { title: "Mehmet Boz | AI Software Engineer", description: "AI applications and agents, from the first idea to production. See my work and experience.", url: "https://mkboz.com", siteName: "Mehmet Boz", locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
  twitter: { title: "Mehmet Boz | AI Software Engineer", card: "summary" },
};

// Apply the saved theme before paint, while keeping the server-rendered page readable.
const themeScript = `(function(){var t='dark';try{if(localStorage.getItem('theme')==='light')t='light'}catch(e){}document.documentElement.classList.toggle('dark',t==='dark')})()`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><Analytics /></head><body id="top"><ThemeProvider><LanguageProvider><Navigation />{children}<Footer /></LanguageProvider></ThemeProvider></body></html>;
}
