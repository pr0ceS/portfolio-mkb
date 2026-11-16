"use client";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../components/language-provider";
const links = [
  { Icon: Mail, href: "mailto:mkboz889@gmail.com", title: "Email", text: "mkboz889@gmail.com" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/mehmet-boz-135a29359/", title: "LinkedIn", text: "Mehmet Boz" },
  { Icon: Github, href: "https://github.com/pr0ceS", title: "GitHub", text: "pr0ceS" }
];
export default function ContactPage() {
  const { language } = useLanguage();
  const nl = language === "nl";
  return <main id="main-content" className="section page-section contact-page"><header className="page-heading"><h1>Contact</h1><p>{nl ? "Een vacature, een project of een vraag over mijn werk? Stuur me een bericht." : "A job opening, a project or a question about my work? Send me a message."}</p></header><div className="contact-links">{links.map(({ Icon, href, title, text }) => <a href={href} key={title} className="contact-card" {...(href.startsWith("https") ? { target: "_blank", rel: "noopener noreferrer" } : {})}><Icon size={28} strokeWidth={1.5} /><div><h2>{title}</h2><p>{text}</p></div><span>{title === "Email" ? (nl ? "Stuur een e-mail" : "Send an email") : (nl ? "Bekijk mijn profiel" : "View my profile")}<ArrowUpRight size={18} /></span></a>)}</div></main>;
}
