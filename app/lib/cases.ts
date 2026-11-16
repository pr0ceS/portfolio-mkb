// Section titles on the projects page. A project's section comes from `category` in its MDX frontmatter.
type Text = { en: string; nl: string };
export type Group = "ai" | "integration" | "automation" | "web" | "earlier";
export const groups: Group[] = ["ai", "integration", "automation", "web", "earlier"];
export const groupTitles: Record<Group, Text> = {
  ai: { en: "AI and data", nl: "AI en data" },
  integration: { en: "Integrations", nl: "Integraties en koppelingen" },
  automation: { en: "Process automation", nl: "Procesautomatisering" },
  web: { en: "Web and e-commerce", nl: "Web en e-commerce" },
  earlier: { en: "Earlier projects", nl: "Eerdere projecten" },
};
