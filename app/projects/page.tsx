import type { Metadata } from "next";
import { getProjects } from "../lib/projects";
import { ProjectsIndex } from "../components/projects-index";
export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage() { return <ProjectsIndex projects={getProjects()} />; }
