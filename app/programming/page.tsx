"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";

export default function ProgrammingPage() {
  const { language } = useLanguage();

  const contentEn = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="lead text-2xl text-zinc-900 dark:text-zinc-200 font-display">
        Pragmatic solutions, not just elegant code.
      </p>
      <p>
        My journey into programming started as a hobby and grew into a passion for solving real-world problems. I specialize in building robust, event-driven systems and intelligent agents. My expertise lies in the Python and JavaScript ecosystems, leveraging modern technologies to create scalable and efficient applications from the ground up.
      </p>
      <div className="grid grid-cols-2 gap-6 my-8">
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">Backend</h4>
            <p className="text-sm">Python (FastAPI), Node.js (Express), BullMQ, Redis, MongoDB</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">Frontend</h4>
            <p className="text-sm">Next.js, React, Astro.js, JavaScript / TypeScript, Tailwind CSS</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">AI/ML</h4>
            <p className="text-sm">LangGraph, RAG, Vector Databases (Qdrant), OpenAI API</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">DevOps & Infra</h4>
            <p className="text-sm">Docker, Nginx, AWS (S3, SES), Vercel, CI/CD</p>
         </div>
      </div>
    </div>
  );

  const contentNl = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="lead text-2xl text-zinc-900 dark:text-zinc-200 font-display">
        Pragmatische oplossingen, niet alleen elegante code.
      </p>
      <p>
        Mijn reis in het programmeren begon als een hobby en groeide uit tot een passie voor het oplossen van problemen uit de echte wereld. Ik ben gespecialiseerd in het bouwen van robuuste, event-driven systemen en intelligente agents. Mijn expertise ligt in de Python- en JavaScript-ecosystemen, waarbij ik moderne technologieën gebruik om schaalbare en efficiënte applicaties vanaf de basis te creëren.
      </p>
      <div className="grid grid-cols-2 gap-6 my-8">
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">Backend</h4>
            <p className="text-sm">Python (FastAPI), Node.js (Express), BullMQ, Redis, MongoDB</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">Frontend</h4>
            <p className="text-sm">Next.js, React, Astro.js, JavaScript / TypeScript, Tailwind CSS</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">AI/ML</h4>
            <p className="text-sm">LangGraph, RAG, Vector Databases (Qdrant), OpenAI API</p>
         </div>
         <div>
            <h4 className="text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-2">DevOps & Infra</h4>
            <p className="text-sm">Docker, Nginx, AWS (S3, SES), Vercel, CI/CD</p>
         </div>
      </div>
    </div>
  );

  const timelineEn = [
    { year: "2023-Present", title: "Founder & Lead Developer, MKAI Platforms", description: "Architecting and building a full-stack, AI-powered e-commerce automation suite from scratch." },
    { year: "2020-2022", title: "Independent Developer", description: "Developed custom tools and websites as a hobby, mastering foundational concepts of web development and system administration." },
  ];

  const timelineNl = [
    { year: "2023-Heden", title: "Oprichter & Lead Developer, MKAI Platforms", description: "Ontwerpen en bouwen van een volledige, AI-gedreven e-commerce automatiseringssuite vanaf nul." },
    { year: "2020-2022", title: "Onafhankelijk Ontwikkelaar", description: "Als hobby custom tools en websites ontwikkeld, waarbij ik fundamentele concepten van webontwikkeling en systeembeheer heb geleerd." },
  ];

  return (
    <InfoPageLayout
      title={language === "en" ? "Programming" : "Programmeren"}
      description={language === "en" ? "Full-Stack Engineering with a focus on impact." : "Full-Stack Engineering met een focus op impact."}
      content={language === "en" ? contentEn : contentNl}
      timelineItems={language === "en" ? timelineEn : timelineNl}
    />
  );
}