// Section titles on the projects page. A project's section comes from `category` in its MDX frontmatter.
type Text = { en: string; nl: string };
export type Group = "ai" | "automation" | "web";
export const groups: Group[] = ["ai", "automation", "web"];
export const groupTitles: Record<Group, Text> = {
  ai: { en: "AI and data", nl: "AI en data" },
  automation: { en: "Integrations and automation", nl: "Integraties en automatisering" },
  web: { en: "Web and e-commerce", nl: "Web en e-commerce" },
};
