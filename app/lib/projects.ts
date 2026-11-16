import { allProjects } from "contentlayer/generated";
export type ProjectSummary = { slug: string; title: string; description: string; locale: string; tags: string[]; category: string; url?: string; status?: string };
// Display order. The first five are the featured cases.
const order = ["floorplan-platform", "aiders", "booking-tool", "freddys-store", "crm-data-quality", "sales-process-prototype", "phishing-investigation", "pos-accounting-integration", "crm-accounting-sync", "ticket-forwarding", "contract-signing", "partner-api-access", "termination-widget", "relocation-flow", "ticket-decision-tree", "deal-attachments", "quick-fixes", "international-shopify-stores", "mksl-orchestrator", "ai-customer-service", "mkai-frontend", "mksl-scout", "mksl-analytics", "mksl-ads"];
export const featuredSlugs = order.slice(0, 5);
export const baseSlug = (slug: string) => slug.replace(/-nl$/, "");
export function getProjects(featured = false): ProjectSummary[] {
  const rank = (slug: string) => { const index = order.indexOf(baseSlug(slug)); return index === -1 ? order.length : index; };
  return allProjects.filter(project => project.published && (!featured || featuredSlugs.includes(baseSlug(project.slug))))
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map(({ slug, title, description, locale, tags, category, url, status }) => ({ slug, title, description, locale: locale || "en", tags: tags || [], category: category || "earlier", url, status }));
}
