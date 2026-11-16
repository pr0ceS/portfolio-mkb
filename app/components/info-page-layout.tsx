"use client";
import { Timeline, type TimelineItem } from "./timeline";
import { useLanguage } from "./language-provider";
interface InfoPageProps { title: string; description: string; content: React.ReactNode; timelineItems?: TimelineItem[] }
export function InfoPageLayout({ title, description, content, timelineItems }: InfoPageProps) {
  const { t } = useLanguage();
  return <main id="main-content" className="section page-section reading-section"><header className="page-heading"><h1>{title}</h1><p>{description}</p></header><div className="info-copy">{content}</div>{timelineItems && <section className="info-timeline"><h2>{t("section_experience")}</h2><Timeline items={timelineItems} /></section>}</main>;
}
