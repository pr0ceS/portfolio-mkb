"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";
import Link from "next/link";
export default function AboutPage() {
  const { language, experience } = useLanguage();
  const nl = language === "nl";
  return <InfoPageLayout title={nl ? "Over mij" : "About me"} description={nl ? "Ik ben Mehmet, AI software engineer uit Enschede." : "I’m Mehmet, an AI software engineer from Enschede."} timelineItems={experience} content={nl ? <>
    <p className="lead">Ik ontwerp en bouw AI-applicaties en AI-agents, en breng ze zelf in productie.</p>
    <p>Het begon met een simpel HTML-bestand en Linux. Ik leerde programmeren door websites te maken en servers te beheren. Toen ik met MKB Trading mijn eigen webshops begon, kreeg dat een praktische richting: ik zag elke dag hoeveel tijd er opging aan terugkerend werk.</p>
    <h2>Van eigen probleem naar product</h2>
    <p>De klantenservice van mijn webshops kostte de meeste tijd. Daarom bouwde ik een AI-agent die e-mails van klanten zelfstandig beantwoordt, in hun eigen taal en op basis van echte bestelgegevens. Die agent werd <Link href="/projects/aiders-nl">Aiders</Link>. Het kwam door de review van Shopify en staat nu in de Shopify App Store.</p>
    <h2>Enige developer</h2>
    <p>Sinds februari 2026 werk ik parttime als software developer bij een verhuurder van kantoorruimte. Ik ben daar de enige developer, dus ik doe alles: wensen ophalen, ontwerpen, bouwen, testen en uitleggen. Het grootste project is een <Link href="/projects/floorplan-platform-nl">plattegrondplatform met een eigen AI-agent</Link>. Daarnaast bouwde ik een boekingstool, koppelingen met de boekhouding en veel kleinere automatiseringen.</p>
    <h2>Hoe ik werk</h2>
    <p>Ik denk in oplossingen en houd het graag eenvoudig. AI gebruik ik waar het werk scheelt, met vaste regels in de code voor alles wat nooit mis mag gaan. Ik meet wat iets kost en test op echte data. En ik leg complexe techniek helder uit aan collega's en klanten.</p>
    <p>Ik spreek Nederlands, Engels en Turks.</p>
    <p><Link href="/projects">Bekijk mijn projecten</Link> of lees meer over <Link href="/programming">mijn technische werk</Link>.</p>
  </> : <>
    <p className="lead">I design and build AI applications and agents, and I bring them to production myself.</p>
    <p>It started with a simple HTML file and Linux. I learned programming by making websites and managing servers. When I started my own webshops with MKB Trading, that interest became practical: every day I saw how much time went into repetitive work.</p>
    <h2>From my own problem to a product</h2>
    <p>Customer service took the most time in my webshops. So I built an AI agent that answers customer emails by itself, in the customer’s language and based on real order data. That agent became <Link href="/projects/aiders">Aiders</Link>. It passed the Shopify review and is now in the Shopify App Store.</p>
    <h2>The only developer</h2>
    <p>Since February 2026 I have worked part-time as a software developer at a company that rents out office space. I am the only developer there, so I do everything: gathering requirements, design, building, testing and explaining. The largest project is a <Link href="/projects/floorplan-platform">floor plan platform with its own AI agent</Link>. I also built a booking tool, links with the accounting system and many smaller automations.</p>
    <h2>How I work</h2>
    <p>I think in solutions and like to keep things simple. I use AI where it saves work, with fixed rules in code for everything that must never go wrong. I measure what things cost and test on real data. And I explain complex technology clearly to colleagues and customers.</p>
    <p>I speak Dutch, English and Turkish.</p>
    <p><Link href="/projects">See my projects</Link> or read more about <Link href="/programming">my technical work</Link>.</p>
  </>} />;
}
