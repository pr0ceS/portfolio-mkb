"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Braces, Compass, Languages, Lightbulb, MessageCircle, Mountain, Rocket, Target, Users, Wrench, Database, Layers, Plug, Sparkles } from "lucide-react";
import { Hero } from "./hero";
import { ProjectGrid, ProjectRows } from "./project-grid";
import { usePlayOnView } from "./use-play-on-view";
import { baseSlug, featuredSlugs } from "../lib/projects";
import { SocialLinks } from "./footer";
import { T, translations, useLanguage } from "./language-provider";
import type { ProjectSummary } from "../lib/projects";
import type { Contributions } from "../lib/contributions";
// Personal strengths, shown as badges under the About section. Each takes a colour from the hero arc.
const traits: [typeof Mountain, string, string, string][] = [
  [MessageCircle, "Social", "Sociaal", "#ff5a1f"], [Languages, "Communicative", "Communicatief", "#fb8a1e"], [Users, "Team player", "Teamplayer", "#f5a524"],
  [Lightbulb, "Proactive", "Proactief", "#e0b400"], [Rocket, "Entrepreneurial", "Ondernemend", "#a5c03a"], [Compass, "Streetwise", "Streetwise", "#5cc26a"],
  [BookOpen, "Fast self-learner", "Snel zelflerend", "#2fbf9f"], [Mountain, "Resilient", "Veerkrachtig", "#22b8cf"], [Wrench, "Pragmatic", "Pragmatisch", "#3d8bff"],
  [Target, "Disciplined", "Gedisciplineerd", "#2f6bff"],
];
const skillIcons = [Sparkles, Braces, Layers, Database, Plug];

// The curve is a drawing of the path so far, not measured data. The three points are the roles below it.
const curve = [[0, 372], [270, 366], [450, 250], [600, 24]];
function pointAt(t: number) { const u = 1 - t; return [0, 1].map(k => u * u * u * curve[0][k] + 3 * u * u * t * curve[1][k] + 3 * u * t * t * curve[2][k] + t * t * t * curve[3][k]); }
const curvePath = `M${curve[0]}C${curve[1]} ${curve[2]} ${curve[3]}`;
const hatch = Array.from({ length: 100 }, (_, i) => `M${i * 6 + 3} 0V400`).join("");
const milestones: [number, string, string][] = [[.1, "2020", "Freelance"], [.58, "2022", "MKB Trading"], [.965, "2026", "MyOffice"]];
function GrowthChart() {
  const ref = usePlayOnView<HTMLDivElement>(.4);
  return <div className="growth-chart" ref={ref} aria-hidden="true">
    <svg viewBox="0 0 600 400">
      <defs><clipPath id="growth-under"><path d={`${curvePath}V400H0Z`} /></clipPath></defs>
      <g clipPath="url(#growth-under)"><g className="growth-fill"><rect className="growth-area" width="600" height="400" /><path className="growth-hatch" d={hatch} /></g></g>
      <path className="growth-line" d={curvePath} pathLength={1} />
      {milestones.map(([t], i) => { const [x, y] = pointAt(t); return <circle className="growth-dot" key={t} cx={x} cy={y} r="5" style={{ "--i": i } as React.CSSProperties} />; })}
    </svg>
    {milestones.map(([t, year, name], i) => { const [x, y] = pointAt(t); return <p className={`growth-label${i === 0 ? " start" : ""}`} key={t} style={{ left: `${x / 6}%`, top: `${y / 4}%`, "--i": i } as React.CSSProperties}><strong>{year}</strong><span>{name}</span></p>; })}
  </div>;
}

// Half a year of GitHub activity, one square per day, a column per week. The numbers are the real ones from the profile.
function Commits({ data, nl }: { data: Contributions; nl: boolean }) {
  const total = data.total.toLocaleString(nl ? "nl-NL" : "en-US");
  const first = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
  return <div className="commits">
    <div className="commits-copy"><p className="commits-total"><strong>{total}</strong> <T en="contributions on GitHub in the last six months." nl="bijdragen op GitHub in het afgelopen halfjaar." /></p><a className="text-link" href="https://github.com/pr0ceS" target="_blank" rel="noopener noreferrer"><T en="See my GitHub" nl="Bekijk mijn GitHub" /><ArrowUpRight size={19} /></a></div>
    <div className="commits-grid" role="img" aria-label={nl ? `Kalender met ${total} bijdragen op GitHub in het afgelopen halfjaar` : `Calendar of ${total} contributions on GitHub in the last six months`}>{data.days.map((day, i) => <span key={day.date} data-level={day.level || undefined} style={i === 0 && first ? { gridRowStart: first + 1 } : undefined} />)}</div>
  </div>;
}

export function Home({ projects, contributions }: { projects: ProjectSummary[]; contributions: Contributions | null }) {
  const { language } = useLanguage();
  const nl = language === "nl";
  const featured = projects.filter(project => featuredSlugs.includes(baseSlug(project.slug)));
  // Lists are in the HTML in both languages and CSS shows one (see T in language-provider), so nothing changes size after loading.
  const both = ["en", "nl"] as const;
  const more = (locale: string) => projects.filter(project => project.locale === locale && !featuredSlugs.includes(baseSlug(project.slug))).slice(0, 6);
  const stats = {
    nl: [["6", "jaar software bouwen"], ["4", "jaar MKB Trading"], ["12", "landen met actieve webshops"], ["2", "producten die je live kunt proberen"]],
    en: [["6", "years building software"], ["4", "years of MKB Trading"], ["12", "countries with active webshops"], ["2", "products you can try live"]],
  };
  return <main id="main-content">
    <Hero />
    <section className="band" id="work" aria-labelledby="work-heading">
      <div className="band-head"><h2 className="duo" id="work-heading"><T en="Projects." nl="Projecten." /> <span><T en="Software I built that runs in production." nl="Software die ik heb gebouwd en die in productie draait." /></span></h2></div>
      <ProjectGrid projects={featured} />
    </section>
    <section className="band" aria-labelledby="more-heading">
      <div className="band-head"><h2 className="duo" id="more-heading"><T en="More projects." nl="Meer projecten." /> <span><T en="AI, automation and e-commerce." nl="AI, automatisering en e-commerce." /></span></h2><Link className="button" href="/projects"><T en="All projects" nl="Alle projecten" /><ArrowRight size={19} /></Link></div>
      {both.map(locale => <div key={locale} data-lang={locale} lang={locale}><ProjectRows projects={more(locale)} /></div>)}
    </section>
    <section className="band" id="experience" aria-labelledby="experience-heading">
      <div className="growth">
        <div className="growth-copy"><h2 className="duo" id="experience-heading"><T en={`${translations.en.section_experience}.`} nl={`${translations.nl.section_experience}.`} /> <span><T en="Six years of building, from freelance work to my own product." nl="Zes jaar bouwen, van freelance werk tot een eigen product." /></span></h2>{both.map(locale => <dl className="stats" key={locale} data-lang={locale} lang={locale}>{stats[locale].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>)}</div>
        <GrowthChart />
      </div>
      {contributions && <Commits data={contributions} nl={nl} />}
      {both.map(locale => <ol className="cells cells-3 roles" key={locale} data-lang={locale} lang={locale}>{translations[locale].experience.map(item => <li key={item.year}><p className="role-year">{item.year}</p><h3>{item.title}</h3>{item.company && <p className="role-company">{item.company}</p>}<p>{item.description}</p></li>)}</ol>)}
    </section>
    <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="about-photo"><Image src="/images/mehmet-boz-about.webp" alt="Mehmet Boz" width={600} height={750} unoptimized /></div><div className="about-copy"><h2 id="about-heading"><T en={translations.en.section_about} nl={translations.nl.section_about} /></h2><p className="lead"><T en="I’m Mehmet, an AI software engineer from Enschede. I make time-consuming work simple with software." nl="Ik ben Mehmet, AI software engineer uit Enschede. Ik maak tijdrovend werk eenvoudig met software." /></p><p><T en="It started with my own webshops. Customer service took so much time that I built an AI agent for it. That agent became Aiders, which is now in the Shopify App Store." nl="Het begon bij mijn eigen webshops. De klantenservice kostte zoveel tijd dat ik er een AI-agent voor bouwde. Die agent werd Aiders en staat nu in de Shopify App Store." /></p><p><T en="I also work as the only developer at a company that rents out office space. There I build everything myself, from the first conversation about what is needed to the tests and the manual. I like explaining complex technology clearly to colleagues and customers." nl="Daarnaast werk ik als enige developer bij een verhuurder van kantoorruimte. Daar bouw ik alles zelf, van het eerste gesprek over wat nodig is tot de tests en de handleiding. Complexe techniek leg ik graag helder uit aan collega's en klanten." /></p><div className="about-links"><Link className="text-link" href="/about"><T en="More about me" nl="Meer over mij" /><ArrowRight size={19} /></Link><SocialLinks /></div></div></section>
    <section className="band" aria-labelledby="traits-heading">
      <div className="band-head"><h2 className="duo" id="traits-heading"><T en="How I work." nl="Hoe ik werk." /> <span><T en="Traits you will see in every project." nl="Eigenschappen die je in elk project terugziet." /></span></h2></div>
      <ul className="traits">{traits.map(([Icon, en, dutch, colour]) => <li key={en} style={{ "--tone": colour } as React.CSSProperties}><span><Icon size={20} strokeWidth={1.9} aria-hidden="true" /></span><T en={en} nl={dutch} /></li>)}</ul>
    </section>
    <section className="band" aria-labelledby="skills-heading">
      <div className="band-head"><h2 className="duo" id="skills-heading"><T en="What I work with." nl="Waar ik mee werk." /> <span><T en="The tools I use most." nl="De tools die ik het meest gebruik." /></span></h2></div>
      {both.map(locale => <ul className="cells cells-5" key={locale} data-lang={locale} lang={locale}>{translations[locale].skillGroups.map(([label, tools], index) => { const Icon = skillIcons[index]; return <li key={label}><Icon size={24} strokeWidth={1.6} aria-hidden="true" /><h3>{label}</h3><p>{tools}</p></li>; })}</ul>)}
    </section>
    <div className="dots" />
  </main>;
}
