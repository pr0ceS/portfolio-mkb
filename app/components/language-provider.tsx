"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "nl";

export type ExperienceItem = {
  year: string;
  title: string;
  company?: string;
  description: string;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  skills: string[];
  softSkills: string[];
  experience: ExperienceItem[];
  lookingFor: { title: string; icon: string }[];
}

const translations = {
  en: {
    // Navigation
    nav_about: "About",
    nav_ecommerce: "E-commerce",
    nav_programming: "Programming",
    nav_projects: "Projects",
    nav_contact: "Contact",
    
    // Hero
    hero_subtitle: "AI & Software Developer with strong experience in e-commerce, customer service and programming.",
    hero_subtitle_2: "Currently seeking opportunities in Software Development, IT, Sales or Customer Service.",
    
    // Section Headers
    section_looking_for: "Seeking Roles In",
    section_experience: "Experience",
    section_skills_soft: "Professional Attributes",
    section_about: "About Me",
    
    // Section Teasers (Main Page)
    teaser_about_desc: "I combine technical skills with business efficiency. From running e-commerce stores to building AI agents, I focus on solving real problems.",
    teaser_ecommerce_title: "E-commerce & Customer Service",
    teaser_ecommerce_desc: "Experience in running a business, automating and speeding up workflows, and optimizing customer support.",
    teaser_programming_title: "Programming & AI",
    teaser_programming_desc: "Full-stack development using Next.js, Python, Node.js and AI integration to build autonomous systems.",
    teaser_projects_title: "Featured Projects",
    teaser_projects_desc: "A showcase of my technical capabilities, from AI agents to marketing automation engines to blazing fast full-stack e-commerce websites.",
    
    // Common
    read_more: "Read More",
    cta_contact_me: "Get in Touch",
    contact_footer_text: "Ready to hire? Let's have a conversation.",

    // Arrays
    skills: ["TypeScript", "Next.js", "React", "Python", "Node.js", "AI Integration", "PostgreSQL", "Tailwind CSS"],
    softSkills: ["Resilience", "Proactive Problem-Solving", "Entrepreneurial Mindset", "Rapid Self-Learning", "Pragmatism", "Analytical Thinking", "Discipline"],
    
    lookingFor: [
      { title: "Junior Developer", icon: "⚡" },
			{ title: "IT", icon: "💻" },
      { title: "Sales", icon: "🚀" },
      { title: "Customer Service", icon: "🎧" }
    ],

    experience: [
      {
        year: "2024 – Present",
        title: "AI & Automation Developer",
        company: "Self-Initiated Projects",
        description: "Architected and built a suite of autonomous e-commerce tools. Key projects include a hybrid AI Customer Service Agent (Python/LangGraph/RAG) and the MKSL marketing automation engine (Node.js/BullMQ) to fully automate product-to-ad pipelines."
      },
      {
        year: "2022 – Present",
        title: "Founder & Full Stack Developer",
        company: "MKB Trading",
        description: "Launched and scaled an e-commerce business, managing all operations. Built multiple full-stack stores with Astro.js & React and created Shopify Themes. Handled high-volume, international customer support and executed data-driven marketing campaigns on Facebook, Google Ads & Pinterest."
      },
      {
        year: "2020 – 2022",
        title: "Independent Developer",
        company: "Hobby & Exploration",
        description: "Started my programming journey with HTML, CSS, Linux, PHP and Ethical Hacking. Developed foundational skills by building various websites and custom scripts, focusing on learning and building projects."
      }
    ]
  },
  nl: {
    // Navigation
    nav_about: "Over Mij",
    nav_ecommerce: "E-commerce",
    nav_programming: "Programmeren",
    nav_projects: "Projecten",
    nav_contact: "Contact",

    // Hero
    hero_subtitle: "AI & Software Developer met sterke ervaring in e-commerce, klantenservice en programmeren.",
    hero_subtitle_2: "Momenteel op zoek naar kansen in Software Development, IT, Sales of Klantenservice.",

    // Section Headers
    section_looking_for: "Op zoek naar rollen in",
    section_experience: "Ervaring",
    section_skills_soft: "Professionele Eigenschappen",
    section_about: "Over Mij",

    // Section Teasers (Main Page)
    teaser_about_desc: "Ik combineer technische vaardigheden met zakelijke efficiëntie. Van het runnen van webshops tot het bouwen van AI-agents, ik focus op het oplossen van echte problemen.",
    teaser_ecommerce_title: "E-commerce & Klantenservice",
    teaser_ecommerce_desc: "Ervaring met het runnen van een bedrijf, het automatiseren en versnellen van workflows, en het optimaliseren van klantenservice.",
    teaser_programming_title: "Programmeren & AI",
    teaser_programming_desc: "Full-stack ontwikkeling met Next.js, Python, Node.js en AI-integratie om autonome systemen te bouwen.",
    teaser_projects_title: "Uitgelichte Projecten",
    teaser_projects_desc: "Een overzicht van mijn technische capaciteiten, van AI-agents en marketing-automatiseringstools tot razendsnelle full-stack e-commerce websites.",

    // Common
    read_more: "Lees Meer",
    cta_contact_me: "Neem Contact Op",
    contact_footer_text: "Klaar om samen te werken? Laten we praten.",

    // Arrays
    skills: ["TypeScript", "Next.js", "React", "Python", "Node.js", "AI Integratie", "PostgreSQL", "Tailwind CSS"],
    softSkills: ["Veerkracht", "Proactief Probleemoplossen", "Ondernemersmentaliteit", "Snel Zelflerend", "Pragmatisme", "Analytisch Denkvermogen", "Discipline"],

    lookingFor: [
      { title: "Junior Developer", icon: "⚡" },
      { title: "IT", icon: "💻" },
      { title: "Sales", icon: "🚀" },
      { title: "Klantenservice", icon: "🎧" }
    ],

    experience: [
      {
        year: "2024 – Heden",
        title: "AI & Automation Developer",
        company: "Eigen Initiatief Projecten",
        description: "Ontwierp en bouwde een suite van autonome e-commerce tools. Kernprojecten omvatten een hybride AI Klantenservice Agent (Python/LangGraph/RAG) en de MKSL marketing automation engine (Node.js/BullMQ) om product-naar-advertentie pipelines volledig te automatiseren."
      },
      {
        year: "2022 – Heden",
        title: "Oprichter & Full Stack Developer",
        company: "MKB Trading",
        description: "Een e-commerce bedrijf gelanceerd en opgeschaald, waarbij ik alle operaties beheerde. Meerdere full-stack webwinkels gebouwd met Astro.js & React en Shopify Themes gecreëerd. Hoog-volume, internationale klantenservice afgehandeld en datagedreven marketingcampagnes uitgevoerd op Facebook, Google Ads & Pinterest."
      },
      {
        year: "2020 – 2022",
        title: "Onafhankelijk Ontwikkelaar",
        company: "Hobby & Verkenning",
        description: "Mijn programmeerreis begonnen met HTML, CSS, Linux, PHP en Ethical Hacking. Fundamentele vaardigheden ontwikkeld door diverse websites en custom scripts te bouwen, met een focus op leren en projecten bouwen."
      }
    ]
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const systemLang = navigator.language.split("-")[0];
      if (systemLang === "nl") {
        setLanguage("nl");
      }
    }
  }, []);

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  const currentSkills = translations[language].skills;
  const currentSoftSkills = translations[language].softSkills;
  const currentExperience = translations[language].experience;
  const currentLookingFor = translations[language].lookingFor;

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      skills: currentSkills, 
      softSkills: currentSoftSkills,
      experience: currentExperience,
      lookingFor: currentLookingFor
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}