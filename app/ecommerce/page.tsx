"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";

export default function EcommercePage() {
  const { language } = useLanguage();

  const contentEn = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="lead text-2xl text-zinc-900 dark:text-zinc-200 font-display">
        Automation is not a luxury; it's the key to profitable scale.
      </p>
      <p>
        Having run my own e-commerce ventures, I've lived the daily grind: endless customer emails, tedious product launches, and the constant battle to optimize ad spend. This hands-on experience taught me that true scalability comes from automating processes, not just working harder.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300 marker:text-zinc-500">
        <li><strong>Customer Support Automation:</strong> Reduced manual email handling by over 90% by developing a hybrid AI agent that understands context and executes tasks.</li>
        <li><strong>Marketing & Sales Automation:</strong> Automated the entire product-to-ad pipeline, cutting launch times from hours to minutes.</li>
        <li><strong>Operational Experience:</strong> Managed international customer service, processed thousands of orders, and handled complex logistics and disputes.</li>
      </ul>
    </div>
  );

  const contentNl = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="lead text-2xl text-zinc-900 dark:text-zinc-200 font-display">
        Automatisering is geen luxe; het is de sleutel tot winstgevende schaalvergroting.
      </p>
      <p>
        Na het runnen van mijn eigen e-commerce ondernemingen, heb ik de dagelijkse sleur ervaren: eindeloze klant-e-mails, saaie productlanceringen en de constante strijd om advertentie-uitgaven te optimaliseren. Deze praktijkervaring heeft me geleerd dat echte schaalbaarheid voortkomt uit het automatiseren van processen, niet alleen uit harder werken.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-zinc-700 dark:text-zinc-300 marker:text-zinc-500">
        <li><strong>Klantenservice Automatisering:</strong> Handmatige e-mailafhandeling met meer dan 90% verminderd door een hybride AI-agent te ontwikkelen die context begrijpt en taken uitvoert.</li>
        <li><strong>Marketing & Sales Automatisering:</strong> De volledige product-naar-advertentie-pijplijn geautomatiseerd, waardoor lanceringstijden zijn teruggebracht van uren naar minuten.</li>
        <li><strong>Operationele Ervaring:</strong> Internationale klantenservice beheerd, duizenden bestellingen verwerkt en complexe logistiek en geschillen afgehandeld.</li>
      </ul>
    </div>
  );

  const timelineEn = [
    { year: "2023", title: "Launched MKAI Platforms", description: "Began development of a proprietary software suite to solve the biggest bottlenecks in my own e-commerce operations." },
    { year: "2022", title: "Managed MKB Trading", description: "Successfully launched and scaled an e-commerce business, handling all aspects from marketing and sales to customer support and fulfillment." },
    { year: "2021", title: "First Shopify Store", description: "Built and ran my first e-commerce store, learning the fundamentals of online retail and digital marketing." },
  ];

  const timelineNl = [
    { year: "2023", title: "Lancering MKAI Platforms", description: "Start van de ontwikkeling van een eigen software suite om de grootste knelpunten in mijn e-commerce activiteiten op te lossen." },
    { year: "2022", title: "Beheer MKB Trading", description: "Succesvol een e-commerce bedrijf gelanceerd en opgeschaald, waarbij ik alle aspecten van marketing en verkoop tot klantenservice en logistiek heb beheerd." },
    { year: "2021", title: "Eerste Shopify Winkel", description: "Mijn eerste e-commerce winkel gebouwd en gerund, en zo de basisprincipes van online retail en digitale marketing geleerd." },
  ];

  return (
    <InfoPageLayout
      title="E-commerce"
      description={language === "en" ? "From Operator to Automator." : "Van Operator naar Automator."}
      content={language === "en" ? contentEn : contentNl}
      timelineItems={language === "en" ? timelineEn : timelineNl}
    />
  );
}