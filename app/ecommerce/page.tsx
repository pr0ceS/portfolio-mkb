"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";
import Link from "next/link";
export default function EcommercePage() {
  const { language } = useLanguage();
  const nl = language === "nl";
  const timeline = nl ? [
    { year: "2026", title: "Aiders", description: "Mijn AI-klantenservice-agent gelanceerd in de Shopify App Store." },
    { year: "2023", title: "MKAI Platforms", description: "Begonnen met eigen software om terugkerend werk in mijn webwinkels te automatiseren." },
    { year: "2022", title: "MKB Trading", description: "Een e-commercebedrijf opgezet en gerund, met verantwoordelijkheid voor winkels, marketing, klantenservice en logistiek." },
    { year: "2021", title: "Eerste Shopify-winkel", description: "Mijn eerste webwinkel gebouwd en gerund. Hier leerde ik de basis van online verkoop en digitale marketing." }
  ] : [
    { year: "2026", title: "Aiders", description: "Launched my AI customer service agent in the Shopify App Store." },
    { year: "2023", title: "MKAI Platforms", description: "Started building software to automate repetitive work in my online stores." },
    { year: "2022", title: "MKB Trading", description: "Built and ran an e-commerce business, managing stores, marketing, customer support and fulfilment." },
    { year: "2021", title: "First Shopify store", description: "Built and ran my first online store, learning online retail and digital marketing." }
  ];
  return <InfoPageLayout title="E-commerce" description={nl ? "De achtergrond van veel van mijn softwareprojecten." : "The background to many of my software projects."} timelineItems={timeline} content={<>
    <p className="lead">{nl ? "Mijn webwinkels gaven me concrete problemen om software voor te bouwen." : "Running online stores gave me practical problems to build software for."}</p>
    <p>{nl ? "Bij MKB Trading werkte ik aan de hele winkel: van Astro- en React-websites en Shopify-thema’s tot productbeheer, advertenties en klantenservice. Daardoor zag ik zelf welke taken tijd kosten en waar software kan helpen." : "At MKB Trading, I worked across the store: Astro and React websites, Shopify themes, product management, advertising and customer support. That gave me a direct understanding of which tasks take time and where software can help."}</p>
    <h2>{nl ? "Wat ik heb gebouwd" : "What I built"}</h2>
    <ul><li>{nl ? <><Link href="/projects/freddys-store-nl">Freddy's Store</Link>: een headless webshop met Medusa, Astro en een zelfgebouwde Mollie-betaalintegratie.</> : <><Link href="/projects/freddys-store">Freddy’s Store</Link>: a headless webshop with Medusa, Astro and a Mollie payment integration I built myself.</>}</li><li>{nl ? <><Link href="/projects/aiders-nl">Aiders</Link>: een AI-agent die klantenservice-e-mails voor Shopify-webshops afhandelt.</> : <><Link href="/projects/aiders">Aiders</Link>: an AI agent that handles customer service emails for Shopify stores.</>}</li><li>{nl ? "Internationale Shopify-webshops met eigen thema's, actief in 12 landen." : "International Shopify stores with custom themes, active in 12 countries."}</li><li>{nl ? "Tools voor productonderzoek, winkelupdates, advertenties en het bijhouden van kosten en omzet." : "Tools for product research, store updates, advertising and tracking costs and revenue."}</li></ul>
    <p>{nl ? "Die ervaring neem ik mee in mijn werk als developer: begrijpen hoe mensen software gebruiken en vervolgens bouwen wat ze nodig hebben." : "I bring that experience to my work as a developer: understanding how people use software, then building what they need."}</p><p><Link href="/projects">{nl ? "Bekijk de softwareprojecten" : "See the software projects"}</Link>.</p>
  </>} />;
}
