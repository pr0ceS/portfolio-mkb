// A soft colour field that is different for every project. The pictures are drawn once by
// scripts/make-art.mjs (npm run art) and saved in public/meshes, so the browser only shows an image.
export function Mesh({ slug, className = "" }: { slug: string; className?: string }) {
  return <span className={`mesh ${className}`} aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/meshes/${slug}.webp`} alt="" width={640} height={640} decoding="async" />
  </span>;
}
