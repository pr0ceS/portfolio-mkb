"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
export type Language = "en" | "nl";
export type ExperienceItem = { year: string; title: string; company?: string; description: string };
export type Principle = { title: string; text: string };
export const translations = {
  en: {
    nav_about: "About", nav_projects: "Projects", nav_contact: "Contact", nav_programming: "Programming", nav_ecommerce: "E-commerce",
    section_experience: "Experience", section_principles: "How I work", section_about: "About me",
    read_more: "Read more", cta_contact_me: "Get in touch",
    skillGroups: [
      ["AI", "LLMs, AI agents, LangGraph, LangChain, RAG, vector databases (Qdrant), Vercel AI SDK, OpenRouter, vision"],
      ["Languages", "Python, TypeScript, JavaScript, Node.js, SQL"],
      ["Frameworks", "FastAPI, Celery, Next.js, React, Astro, Medusa"],
      ["Data and infrastructure", "PostgreSQL, Redis, Docker, Cloudflare Workers, Vercel, Fly.io, Vitest, Playwright"],
      ["Integrations", "REST APIs, OAuth 2.0, webhooks, Zoho, Exact Online, Shopify, Mollie"]
    ],
    principles: [
      { title: "The AI never has the last word.", text: "Whatever the AI wants to do is checked by the software first, just like a click from a person." },
      { title: "Important rules can't be broken.", text: "I build them into the software itself, instead of trusting the AI to follow them." },
      { title: "I measure before I improve.", text: "I keep track of what every AI answer costs and how long it takes, and fix what the numbers point to." },
      { title: "I test with real work.", text: "Real floor plans and real data, in tests that run automatically." }
    ],
    experience: [
      { year: "Feb 2026 – Present", title: "Software Developer", company: "MyOffice (MyGroup), part-time, sole developer", description: "Built a floor plan platform from idea to production. It turns architect PDFs into editable drawings with exact square metres, linked to the CRM, and has its own AI agent that builds and furnishes rooms. Also built an online booking tool for meeting rooms, repaired the data of more than 1,100 rooms and connected the CRM to accounting and external partners." },
      { year: "2022 – Present", title: "Founder & Lead Developer", company: "MKB Trading", description: "Designed and built Aiders, an AI agent that handles customer service emails for Shopify stores, live in the Shopify App Store. Built and scaled webshops that are now active in 12 countries, and my own tool to automate Meta ads." },
      { year: "2020 – 2022", title: "Freelance Developer", description: "Moved legacy PHP to Python and Node.js, and managed Linux servers." }
    ]
  },
  nl: {
    nav_about: "Over mij", nav_projects: "Projecten", nav_contact: "Contact", nav_programming: "Programmeren", nav_ecommerce: "E-commerce",
    section_experience: "Ervaring", section_principles: "Hoe ik werk", section_about: "Over mij",
    read_more: "Lees meer", cta_contact_me: "Neem contact op",
    skillGroups: [
      ["AI", "LLM's, AI-agents, LangGraph, LangChain, RAG, vector databases (Qdrant), Vercel AI SDK, OpenRouter, vision"],
      ["Programmeertalen", "Python, TypeScript, JavaScript, Node.js, SQL"],
      ["Frameworks", "FastAPI, Celery, Next.js, React, Astro, Medusa"],
      ["Data en infrastructuur", "PostgreSQL, Redis, Docker, Cloudflare Workers, Vercel, Fly.io, Vitest, Playwright"],
      ["Integraties", "REST API's, OAuth 2.0, webhooks, Zoho, Exact Online, Shopify, Mollie"]
    ],
    principles: [
      { title: "De AI heeft nooit het laatste woord.", text: "Alles wat de AI wil doen, controleert de software eerst, net als bij een klik van een mens." },
      { title: "Belangrijke regels zijn niet te omzeilen.", text: "Ik bouw ze in de software zelf, in plaats van erop te vertrouwen dat de AI zich eraan houdt." },
      { title: "Eerst meten, dan verbeteren.", text: "Ik houd bij wat elk AI-antwoord kost en hoe lang het duurt, en pak aan wat de cijfers laten zien." },
      { title: "Testen met echt werk.", text: "Echte plattegronden en echte gegevens, in tests die automatisch draaien." }
    ],
    experience: [
      { year: "Feb 2026 – Heden", title: "Software Developer", company: "MyOffice (MyGroup), parttime, enige developer", description: "Van idee tot productie een plattegrondplatform gebouwd. Het zet architecten-PDF's om in bewerkbare tekeningen met exacte vierkante meters, gekoppeld aan het CRM, en heeft een eigen AI-agent die ruimtes bouwt en inricht. Daarnaast een online boekingstool voor vergaderruimtes gebouwd, de data van ruim 1.100 ruimtes hersteld en het CRM gekoppeld aan de boekhouding en externe partners." },
      { year: "2022 – Heden", title: "Oprichter & Lead Developer", company: "MKB Trading", description: "Aiders ontworpen en gebouwd, een AI-agent die klantenservice-e-mails voor Shopify-webshops afhandelt, live in de Shopify App Store. Webshops gebouwd en opgeschaald die nu in 12 landen actief zijn, en een eigen tool om Meta-advertenties te automatiseren." },
      { year: "2020 – 2022", title: "Freelance Developer", description: "Legacy PHP omgezet naar Python en Node.js, en Linux-servers beheerd." }
    ]
  }
};
type Context = { language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string; skillGroups: string[][]; principles: Principle[]; experience: ExperienceItem[] };
const LanguageContext = createContext<Context | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  const pathname = usePathname() ?? "/";
  const setLanguage = useCallback((lang: Language) => {
    updateLanguage(lang);
    document.documentElement.lang = lang;
    try { localStorage.setItem("portfolio-language", lang); } catch {}
  }, []);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("portfolio-language"); } catch {}
    const lang = stored === "nl" || stored === "en" ? stored : navigator.language.startsWith("nl") ? "nl" : "en";
    setLanguage(lang);
  }, [setLanguage]);
  useEffect(() => {
    if (pathname.startsWith("/projects/")) setLanguage(pathname.endsWith("-nl") ? "nl" : "en");
  }, [pathname, setLanguage]);
  const current = translations[language];
  function t(key: string) { const value = current[key as keyof typeof current]; return typeof value === "string" ? value : key; }
  return <LanguageContext.Provider value={{ language, setLanguage, t, skillGroups: current.skillGroups, principles: current.principles, experience: current.experience }}>{children}</LanguageContext.Provider>;
}
// Text that is on screen before the page becomes interactive. Both languages are in the HTML and CSS shows the one
// that matches <html lang>, which a script in the layout sets before the first paint. Without this a Dutch visitor
// first sees the English text, and the layout shifts when it is swapped.
export function T({ en, nl }: { en: string; nl: string }) {
  return <><span data-lang="en" lang="en">{en}</span><span data-lang="nl" lang="nl">{nl}</span></>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
