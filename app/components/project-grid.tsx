"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { baseSlug, type ProjectSummary } from "../lib/projects";
import { useLanguage } from "./language-provider";
import { ClipButtons, hasSound, hasVideo, ProjectArtwork } from "./project-art";
import { Mesh } from "./mesh";
import { groupTitles, type Group } from "../lib/cases";

export const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
type Level = { headingLevel?: 2 | 3 };

// Featured cases: a drawing or screenshot of the product, framed by the project's own colour field.
export function ProjectGrid({ projects, headingLevel = 3 }: { projects: ProjectSummary[] } & Level) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const { language } = useLanguage();
  const nl = language === "nl";
  return <div className="bento">{projects.filter(project => project.locale === language).map(project => <article className="bento-cell" key={project.slug}>
    <div className="bento-copy"><Heading><Link href={`/projects/${project.slug}`}>{project.title}.</Link></Heading>{" "}<p>{project.description}</p></div>
    <div className="art-wrap"><Link href={`/projects/${project.slug}`} className="art-frame" aria-label={`${nl ? "Bekijk" : "View"} ${project.title}`} tabIndex={-1}><Mesh slug={baseSlug(project.slug)} /><div className="art-panel" aria-hidden="true"><ProjectArtwork slug={baseSlug(project.slug)} nl={nl} /></div></Link>{hasVideo(baseSlug(project.slug)) && <ClipButtons nl={nl} sound={hasSound(baseSlug(project.slug))} />}</div>
    <div className="bento-foot"><Link className="text-link" href={`/projects/${project.slug}`}>{nl ? "Lees de case" : "Read the case"}<ArrowRight size={19} /></Link>{project.url ? <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">{hostOf(project.url)}<ArrowUpRight size={19} /></a> : project.status && <span className="bento-status">{project.status}</span>}</div>
  </article>)}</div>;
}

// Other cases: a colour field with the title below it.
export function ProjectTiles({ projects, headingLevel = 3 }: { projects: ProjectSummary[] } & Level) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <div className="tiles">{projects.map(project => <Link className="tile" href={`/projects/${project.slug}`} key={project.slug}>
    <span className="tile-art"><Mesh slug={baseSlug(project.slug)} /></span>
    <Heading className="tile-title">{project.title}</Heading>
    <span className="tile-meta">{project.description}</span>
  </Link>)}</div>;
}

export function ProjectRows({ projects }: { projects: ProjectSummary[] }) {
  const { language } = useLanguage();
  return <div className="rows">{projects.map(project => <Link className="row-link" href={`/projects/${project.slug}`} key={project.slug}>
    <span className="tile-art"><Mesh slug={baseSlug(project.slug)} /></span>
    <span><h3 className="tile-title">{project.title}</h3><span className="tile-meta">{groupTitles[project.category as Group]?.[language]}</span></span>
  </Link>)}</div>;
}
