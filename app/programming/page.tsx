"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";
import Link from "next/link";
export default function ProgrammingPage() {
  const { language, skillGroups } = useLanguage();
  const nl = language === "nl";
  const suffix = nl ? "-nl" : "";
  return <InfoPageLayout title={nl ? "Programmeren" : "Programming"} description={nl ? "Van AI-agent tot interface, en alles ertussen." : "From AI agent to interface, and everything in between."} content={<>
    <p className="lead">{nl ? "Ik bouw AI-agents, webapplicaties en koppelingen tussen systemen, meestal van begin tot eind." : "I build AI agents, web applications and links between systems, usually from start to finish."}</p>
    <p>{nl ? "Voor AI-werk gebruik ik vooral Python en TypeScript. Agents bouw ik met LangGraph of de Vercel AI SDK, met RAG zodat antwoorden op echte data zijn gebaseerd. De applicaties eromheen bouw ik met Next.js, React en FastAPI." : "For AI work I mostly use Python and TypeScript. I build agents with LangGraph or the Vercel AI SDK, with RAG so that answers are based on real data. The applications around them are built with Next.js, React and FastAPI."}</p>
    <h2>{nl ? "Waar ik mee werk" : "What I work with"}</h2><div className="technical-grid">{skillGroups.map(([title, tools]) => <div key={title}><h3>{title}</h3><p>{tools}</p></div>)}</div>
    <h2>{nl ? "In de praktijk" : "In practice"}</h2>
    <p>{nl ? <>Het <Link href={`/projects/floorplan-platform${suffix}`}>plattegrondplatform</Link> is ongeveer 100.000 regels TypeScript met ruim 2.300 geautomatiseerde tests. De AI-agent daarin werkt met 22 gevalideerde tools. <Link href={`/projects/aiders${suffix}`}>Aiders</Link> is een multi-agent systeem in Python met LangGraph, Qdrant, Celery en Redis. <Link href={`/projects/freddys-store${suffix}`}>Freddy's Store</Link> draait op Medusa en Astro, met een zelfgebouwde betaalintegratie.</> : <>The <Link href={`/projects/floorplan-platform${suffix}`}>floor plan platform</Link> is about 100,000 lines of TypeScript with more than 2,300 automated tests. Its AI agent works with 22 validated tools. <Link href={`/projects/aiders${suffix}`}>Aiders</Link> is a multi-agent system in Python with LangGraph, Qdrant, Celery and Redis. <Link href={`/projects/freddys-store${suffix}`}>Freddy’s Store</Link> runs on Medusa and Astro, with a payment integration I built myself.</>}</p>
    <p>{nl ? "Ik werk AI-native, met Claude Code als pair-programmer. Ik bepaal de architectuur, schrijf de specificaties en controleer alles met tests en metingen." : "I work AI-native, with Claude Code as a pair programmer. I decide the architecture, write the specifications and verify everything with tests and measurements."}</p>
    <p><Link href="/projects">{nl ? "Bekijk alle projecten" : "See all projects"}</Link>.</p>
  </>} />;
}
