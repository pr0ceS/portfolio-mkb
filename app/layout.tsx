import "../global.css";
import { Haptics } from "./components/haptics";
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

// Apply the saved theme and the language before paint, while keeping the server-rendered page readable.
// The language rule is the same one LanguageProvider uses: a case page decides by its address, otherwise the saved choice, otherwise the browser.
const themeScript = `(function(){var t='dark',l='';try{if(localStorage.getItem('theme')==='light')t='light';l=localStorage.getItem('portfolio-language')}catch(e){}var d=document.documentElement;d.classList.toggle('dark',t==='dark');if(/^\\/projects\\/./.test(location.pathname))l=/-nl$/.test(location.pathname)?'nl':'en';else if(l!=='nl'&&l!=='en')l=(navigator.language||'').indexOf('nl')===0?'nl':'en';d.lang=l})()`;
// First visit to the home page in a browser session: play the full-screen introduction once.
// It runs before paint, ends by itself after a few seconds, and any click, key or scroll skips it.
// At the end it shrinks the full-screen hero to its normal height, so the projects come into view.
const introScript = `(function(){try{if(location.pathname!=='/'||location.hash||sessionStorage.getItem('intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('intro','1');var d=document.documentElement,over=false;d.classList.add('intro');var end=function(){if(over)return;over=true;var h=document.querySelector('.hero-shell');if(h&&h.firstElementChild){var full=h.offsetHeight,nat=h.firstElementChild.offsetHeight+parseFloat(getComputedStyle(h).paddingBottom);h.style.minHeight=full+'px';d.classList.remove('intro');d.classList.add('intro-done');h.offsetHeight;h.style.minHeight=nat+'px';setTimeout(function(){h.style.minHeight=''},1000)}else{d.classList.remove('intro');d.classList.add('intro-done')}};setTimeout(end,2300);['pointerdown','keydown','wheel','touchmove'].forEach(function(n){addEventListener(n,end,{once:true,passive:true})})}catch(e){}})()`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script dangerouslySetInnerHTML={{ __html: introScript }} /><Analytics /></head><body id="top"><ThemeProvider><LanguageProvider><Haptics /><Navigation />{children}<Footer /></LanguageProvider></ThemeProvider></body></html>;
}
