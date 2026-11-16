// Draws the colour fields and the hero rays once and saves them as images, so the browser does not
// have to blur SVG shapes while someone scrolls. Run with: npm run art
// Run it again after adding a project or changing a palette.
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";

// Colours: [base, three shape colours].
const palettes = [
  ["#1d5fd0", "#18c8e8", "#0a3fa8", "#dff8ff"],
  ["#8f63ee", "#c3a0fb", "#e9a56c", "#6a48dc"],
  ["#3a70ff", "#a58cf5", "#ff9ec7", "#ffc9ad"],
  ["#ff6a1a", "#d43a00", "#ffb36a", "#ff8f4a"],
  ["#3fbf63", "#1f6bff", "#37b6c9", "#a9df5c"],
  ["#ff5a1f", "#f7936a", "#2b5fd9", "#8a5a7a"],
  ["#ffc93c", "#ff9a5a", "#ff7a8a", "#ffe27a"],
  ["#a9bcff", "#8fd0ff", "#ece4ff", "#6fb0ff"],
  ["#0fa58a", "#c8f06a", "#0b6a7a", "#5ad6b0"],
  ["#ff5c8a", "#7a2ad0", "#ffb0a0", "#401a80"],
  ["#0b2a6a", "#2ad0b0", "#4a7aff", "#b0ffe0"],
  ["#a8845a", "#6e5233", "#e3c692", "#3c2c1c"],
  ["#3a2c4a", "#6a4a7a", "#c98aa0", "#1c1626"],
  ["#1a2233", "#3a4a70", "#8aa0d8", "#0a66d8"],
];
// Projects with their own brand colours.
const own = { "booking-tool": ["#ffce00", "#ffe26a", "#f2a900", "#fff4bf"] };
// The position in this list picks the palette. Add new projects at the end.
const order = ["floorplan-platform", "aiders", "booking-tool", "freddys-store", "crm-data-quality", "sales-process-prototype", "phishing-investigation", "pos-accounting-integration", "crm-accounting-sync", "ticket-forwarding", "contract-signing", "partner-api-access", "termination-widget", "relocation-flow", "ticket-decision-tree", "deal-attachments", "quick-fixes", "international-shopify-stores", "mksl-orchestrator", "ai-customer-service", "mkai-frontend", "mksl-scout", "mksl-analytics", "mksl-ads"];

function hash(text) { let h = 2166136261; for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function random(seed) { return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const n = value => Math.round(value * 10) / 10;

function meshSvg(slug) {
  const seed = hash(slug), index = order.indexOf(slug);
  const [base, a, b, c] = own[slug] ?? palettes[(index === -1 ? seed : index) % palettes.length];
  const r = random(seed), between = (min, max) => min + r() * (max - min);
  const blobs = [a, b, c].map(color => ({ color, cx: n(between(0, 100)), cy: n(between(0, 100)), rx: n(between(34, 62)), ry: n(between(22, 44)), turn: n(between(0, 180)) }));
  // Two sharp-edged sweeps on top of the soft blobs give the folded-light look.
  const sweeps = [c, r() > .5 ? "#ffffff" : a].map((color, i) => {
    const x = between(10, 90), w = between(18, 46), lean = between(-70, 70);
    return { color, opacity: n(i ? between(.35, .6) : between(.55, .9)), points: `${n(x)},-20 ${n(x + w)},-20 ${n(x + w + lean)},120 ${n(x + lean - w * .4)},120` };
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="640" height="640">
    <defs><filter id="a" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="15"/></filter><filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>
    <rect width="100" height="100" fill="${base}"/>
    <g filter="url(#a)">${blobs.map(blob => `<ellipse cx="${blob.cx}" cy="${blob.cy}" rx="${blob.rx}" ry="${blob.ry}" fill="${blob.color}" transform="rotate(${blob.turn} ${blob.cx} ${blob.cy})"/>`).join("")}</g>
    <g filter="url(#b)">${sweeps.map(sweep => `<polygon points="${sweep.points}" fill="${sweep.color}" opacity="${sweep.opacity}"/>`).join("")}</g>
  </svg>`;
}

// The hero: fine rays that are only visible near the arc, plus a soft glow along it.
function raysSvg({ width, height, step, stroke }) {
  const arc = "M0 560Q720 40 1440 560";
  const rays = Array.from({ length: Math.ceil(1440 / step) }, (_, i) => `M${i * step + 4} 0V560`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 560" width="${width}" height="${height}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="0" x2="1440"><stop offset="0" stop-color="#ff5a1f"/><stop offset=".3" stop-color="#ffc93c"/><stop offset=".62" stop-color="#3fd0c0"/><stop offset="1" stop-color="#2f6bff"/></linearGradient>
      <filter id="soft" filterUnits="userSpaceOnUse" x="-200" y="-200" width="1840" height="960"><feGaussianBlur stdDeviation="62"/></filter>
      <filter id="blur" filterUnits="userSpaceOnUse" x="-200" y="-200" width="1840" height="960"><feGaussianBlur stdDeviation="9"/></filter>
      <clipPath id="sky"><path d="M0 0H1440V560Q720 40 0 560Z"/></clipPath>
      <mask id="near" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="560"><path d="${arc}" fill="none" stroke="#fff" stroke-width="250" filter="url(#soft)"/></mask>
    </defs>
    <g clip-path="url(#sky)">
      <g mask="url(#near)"><path d="${rays}" fill="none" stroke="url(#c)" stroke-width="${stroke}"/></g>
      <path d="${arc}" fill="none" stroke="url(#c)" stroke-width="16" opacity=".7" filter="url(#blur)"/>
    </g>
  </svg>`;
}

mkdirSync("public/meshes", { recursive: true });
const slugs = new Set(order);
for (const file of readdirSync("content/projects")) if (file.endsWith(".mdx") && !file.endsWith("-nl.mdx")) slugs.add(file.replace(/\.mdx$/, ""));
let total = 0;
for (const slug of slugs) {
  const info = await sharp(Buffer.from(meshSvg(slug))).webp({ quality: 86 }).toFile(`public/meshes/${slug}.webp`);
  total += info.size;
}
console.log(`${slugs.size} colour fields, ${Math.round(total / 1024)} KB together`);

// Fine grain that is laid over the colour fields: a small tile of faint light and dark specks.
const size = 128, grain = Buffer.alloc(size * size * 4), rnd = random(7);
for (let i = 0; i < size * size; i++) { const light = rnd() > .5; grain.set([light ? 255 : 0, light ? 255 : 0, light ? 255 : 0, Math.round(rnd() * 26)], i * 4); }
console.log("grain", (await sharp(grain, { raw: { width: size, height: size, channels: 4 } }).png({ compressionLevel: 9 }).toFile("public/meshes/grain.png")).size);

for (const [name, options] of [["arc-wide", { width: 2880, height: 1120, step: 8, stroke: 1 }], ["arc-narrow", { width: 1640, height: 750, step: 16, stroke: 2.6 }]]) {
  const info = await sharp(Buffer.from(raysSvg(options))).webp({ quality: 82, alphaQuality: 90 }).toFile(`public/images/${name}.webp`);
  console.log(name, Math.round(info.size / 1024), "KB");
}
