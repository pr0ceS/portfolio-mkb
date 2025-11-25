"use client";
import { InfoPageLayout } from "../components/info-page-layout";
import { useLanguage } from "../components/language-provider";

export default function AboutPage() {
  const { language } = useLanguage();

  // English Content
  const contentEn = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="text-xl text-zinc-900 dark:text-zinc-200 font-medium">
        It all started with a simple HTML file and the freedom of Linux.
      </p>
      <p>
        My journey into technology began as a hobby, sparked by the sheer fun of creating my first website and the endless possibilities of open-source systems like Linux. That initial curiosity quickly evolved into a mission when I started my own e-commerce business, MKB Trading.
      </p>
      <p>
        I was on the front lines, and while I genuinely enjoy talking to customers, I realized that manual customer support was consuming all my time. With the rise of AI, I saw an opportunity. I started small, building tools to translate product descriptions, but soon I asked myself a bigger question: "Could I build an AI that doesn't just answer questions, but actually helps customers?" The challenge was so captivating that I dove in completely, driven by the passion for building it.
      </p>
      <p>
        The result is my proudest achievement: a hybrid AI agent that is not only advanced and realistic but is also bound by programmatic rules it cannot break. The feedback was incredible. Customers were happier because they received accurate, thoughtful answers almost instantly. This proved my most important lesson: AI isn't just a tool for cutting costs; it's a tool for creating a better experience for everyone, both the business and the customer.
      </p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
           <h3 className="text-zinc-900 dark:text-white font-bold mb-2">My Philosophy</h3>
           <p>Build systems that empower both the business and its customers. Technology should be a win-win.</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
           <h3 className="text-zinc-900 dark:text-white font-bold mb-2">My Impact</h3>
           <p>Transformed customer support into a better, faster experience while reducing operational costs to less than €30/month.</p>
        </div>
      </div>
    </div>
  );

  // Dutch Content
  const contentNl = (
    <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
      <p className="text-xl text-zinc-900 dark:text-zinc-200 font-medium">
        Het begon allemaal met een simpel HTML-bestand en de vrijheid van Linux.
      </p>
      <p>
        Mijn reis in de technologie begon als een hobby, aangewakkerd door het plezier van het maken van mijn eerste website en de eindeloze mogelijkheden van open-source systemen zoals Linux. Die aanvankelijke nieuwsgierigheid groeide al snel uit tot een missie toen ik mijn eigen e-commercebedrijf, MKB Trading, startte.
      </p>
      <p>
        Ik stond in de frontlinie. Hoewel ik het oprecht leuk vind om met klanten te praten, realiseerde ik me dat handmatige klantenservice al mijn tijd opslokte. Met de opkomst van AI zag ik een kans. Ik begon klein, met tools om productbeschrijvingen te vertalen, maar al snel stelde ik mezelf een grotere vraag: "Zou ik een AI kunnen bouwen die niet alleen vragen beantwoordt, maar klanten ook echt helpt?" De uitdaging was zo boeiend dat ik er volledig indook, gedreven door de passie voor het bouwen.
      </p>
      <p>
        Het resultaat is mijn grootste trots: een hybride AI-agent die niet alleen geavanceerd en realistisch is, maar ook gebonden is aan programmatische regels die hij niet kan overtreden. De feedback was ongelooflijk. Klanten waren blijer omdat ze vrijwel direct accurate, meedenkende antwoorden kregen. Dit bewees mijn belangrijkste les: AI is niet alleen een tool om kosten te besparen; het is een tool om een betere ervaring te creëren voor iedereen, zowel voor het bedrijf als voor de klant.
      </p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
           <h3 className="text-zinc-900 dark:text-white font-bold mb-2">Mijn Filosofie</h3>
           <p>Bouw systemen die zowel het bedrijf als zijn klanten versterken. Technologie moet een win-win zijn.</p>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
           <h3 className="text-zinc-900 dark:text-white font-bold mb-2">Mijn Impact</h3>
           <p>Klantenservice getransformeerd naar een betere, snellere ervaring en tegelijk de operationele kosten verlaagd naar minder dan €30/maand.</p>
        </div>
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title={language === "en" ? "My Journey" : "Mijn Reis"}
      description={language === "en" ? "From Hobbyist to Problem-Solver." : "Van Hobbyist naar Probleemoplosser."}
      content={language === "en" ? contentEn : contentNl}
    />
  );
}