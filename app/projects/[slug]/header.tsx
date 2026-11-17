"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/app/components/language-provider";
import { hasArtwork, hasVideo, ProjectArtwork } from "@/app/components/project-art";
import { Mesh } from "@/app/components/mesh";
import { hostOf } from "@/app/components/project-grid";
type Props = { project: { slug: string; url?: string; title: string; description: string; repository?: string; status?: string; tags?: string[] } };
export function Header({ project }: Props) {
  const { language } = useLanguage();
  const nl = language === "nl";
  const slug = project.slug.replace(/-nl$/, "");
  return <header className="project-header">
    <Link className="text-link" href="/projects"><ArrowLeft size={19} />{nl ? "Alle projecten" : "All projects"}</Link>
    <div className="page-heading"><h1>{project.title}</h1><p>{project.description}</p></div>
    {(project.url || project.repository) && <div className="project-actions">{project.url && <a className="button" href={project.url} target="_blank" rel="noopener noreferrer">{nl ? "Bekijk live op" : "Try it live at"} {hostOf(project.url)}<ArrowUpRight size={20} /></a>}{project.repository && <a className="button secondary" href={`https://github.com/${project.repository}`} target="_blank" rel="noopener noreferrer"><Github size={20} />{nl ? "Bekijk de code" : "View the code"}</a>}</div>}
    {hasArtwork(slug) ? <div className="project-figure" aria-hidden={hasVideo(slug) ? undefined : true}><Mesh slug={slug} /><div className="art-panel"><ProjectArtwork slug={slug} nl={nl} priority controls /></div></div> : <div className="project-banner"><Mesh slug={slug} /></div>}
    <dl className="project-facts">{project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}{project.tags?.length ? <div><dt>{nl ? "Gebouwd met" : "Built with"}</dt><dd>{project.tags.join(", ")}</dd></div> : null}</dl>
  </header>;
}
