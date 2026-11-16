import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return allProjects.filter(p => p.published).map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find(p => p.slug === slug && p.published);
  return project ? { title: project.title, description: project.description } : {};
}
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find(p => p.slug === slug && p.published);
  if (!project) notFound();
  return <main id="main-content"><Header project={project} /><div className="project-body"><article><Mdx code={project.body.code} /></article></div></main>;
}
