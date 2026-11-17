"use client";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { T, useLanguage } from "./language-provider";
export function SocialLinks() {
  return <div className="social-links"><a href="https://github.com/pr0ceS" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/mehmet-boz-135a29359/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} /></a></div>;
}
export function Footer() {
  const { language } = useLanguage();
  const nl = language === "nl";
  return <footer className="site-footer" id="contact">
    <div className="contact-inner"><h2><T en="Shall we talk?" nl="Zullen we kennismaken?" /></h2><p><T en="A job opening, a project or just a question about my work. Send me a message and I will reply soon." nl="Een vacature, een project of gewoon een vraag over mijn werk. Stuur me een bericht, ik reageer snel." /></p><a className="button" href="mailto:mkboz889@gmail.com"><T en="Send an email" nl="Stuur een e-mail" /><ArrowUpRight size={20} /></a><a className="contact-email" href="mailto:mkboz889@gmail.com">mkboz889@gmail.com</a></div>
    <div className="footer-bottom"><Link href="/" className="brand">Mehmet Boz</Link><SocialLinks /><a href="#top"><T en="Back to top" nl="Naar boven" /><ArrowUp size={18} /></a></div>
  </footer>;
}
