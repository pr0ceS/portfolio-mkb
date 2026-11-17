"use client";
import { useLanguage } from "./language-provider";
import { ProjectGrid, ProjectTiles } from "./project-grid";
import { baseSlug, featuredSlugs, type ProjectSummary } from "../lib/projects";
import { groups, groupTitles } from "../lib/cases";

export function ProjectsIndex({ projects }: { projects: ProjectSummary[] }) {
  const { language } = useLanguage();
  const nl = language === "nl";
  const local = projects.filter(project => project.locale === language);
  const featured = projects.filter(project => featuredSlugs.includes(baseSlug(project.slug)));
  const rest = local.filter(project => !featuredSlugs.includes(baseSlug(project.slug)));
  return <main id="main-content">
    <div className="section page-section projects-head"><header className="page-heading"><h1>{nl ? "Projecten" : "Projects"}</h1><p>{nl ? "AI-agents, webapplicaties, koppelingen en automatisering. Bovenaan het werk dat live staat, daaronder alles per onderwerp." : "AI agents, web applications, integrations and automation. Work that is live comes first, everything else is listed by subject."}</p></header></div>
    <div className="band"><ProjectGrid projects={featured} headingLevel={2} /></div>
    {groups.map(group => {
      const pages = rest.filter(project => project.category === group);
      if (!pages.length) return null;
      return <section className="band" key={group} aria-labelledby={`group-${group}`}>
        <div className="band-head"><h2 className="duo" id={`group-${group}`}>{groupTitles[group][language]}</h2></div>
        <ProjectTiles projects={pages} />
      </section>;
    })}
  </main>;
}
