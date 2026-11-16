import type { ExperienceItem } from "./language-provider";
export type TimelineItem = ExperienceItem;
export function Timeline({ items }: { items: TimelineItem[] }) {
  return <ol className="experience-timeline">{items.map(item => <li key={`${item.year}-${item.title}`}><div className="timeline-date">{item.year}</div><div className="timeline-entry"><span className="timeline-dot" aria-hidden="true" /><h3>{item.title}</h3>{item.company && <p className="timeline-company">{item.company}</p>}<p>{item.description}</p></div></li>)}</ol>;
}
