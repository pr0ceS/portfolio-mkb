// The contribution calendar from the public GitHub profile, re-read at most once an hour.
// GitHub has no open API for this, so the public calendar page is read. If that fails, the widget is left out.
export type Contributions = { total: number; days: { date: string; count: number; level: number }[] };

export async function getContributions(): Promise<Contributions | null> {
  try {
    const response = await fetch("https://github.com/users/pr0ceS/contributions", { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const html = await response.text();
    const counts = new Map<string, number>();
    for (const match of Array.from(html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>\s*(\d+|No) contribution/g))) counts.set(match[1], match[2] === "No" ? 0 : +match[2]);
    const days: Contributions["days"] = [];
    for (const [cell] of Array.from(html.matchAll(/<td[^>]*data-date="[^>]*>/g))) {
      const date = cell.match(/data-date="([\d-]+)"/)?.[1];
      const id = cell.match(/id="([^"]+)"/)?.[1];
      if (date && id) days.push({ date, count: counts.get(id) ?? 0, level: +(cell.match(/data-level="(\d)"/)?.[1] ?? 0) });
    }
    if (days.length < 300) return null;
    days.sort((a, b) => a.date.localeCompare(b.date));
    // Only the last half year is shown: whole weeks, starting on a Sunday.
    const recent = days.slice(-(26 * 7 + new Date(`${days[days.length - 1].date}T00:00:00Z`).getUTCDay() + 1));
    return { total: recent.reduce((sum, day) => sum + day.count, 0), days: recent };
  } catch { return null; }
}
