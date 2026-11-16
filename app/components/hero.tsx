"use client";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./language-provider";
import { NameMark } from "./name-mark";

// A horizon under the name: one coloured arc, with fine light rays above it that fade out.
// The rays and the glow are a picture made by scripts/make-art.mjs; only the sharp line is drawn live.
function HeroArc() {
  return <>
    <picture><source media="(max-width: 700px)" srcSet="/images/arc-narrow.webp" /><img className="hero-rays" src="/images/arc-wide.webp" alt="" width={1440} height={560} decoding="async" /></picture>
    <svg className="hero-arc" viewBox="0 0 1440 560" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="arc-colours" gradientUnits="userSpaceOnUse" x1="0" x2="1440"><stop offset="0" stopColor="#ff5a1f" /><stop offset=".3" stopColor="#ffc93c" /><stop offset=".62" stopColor="#3fd0c0" /><stop offset="1" stopColor="#2f6bff" /></linearGradient>
        <clipPath id="arc-dome" clipPathUnits="objectBoundingBox"><path d="M0 1Q.5 .0714 1 1Z" /></clipPath>
      </defs>
      <path className="arc-line" d="M0 560Q720 40 1440 560" stroke="url(#arc-colours)" />
    </svg>
  </>;
}

export function Hero() {
  const { language } = useLanguage();
  const nl = language === "nl";
  return <section className="hero-shell" aria-labelledby="hero-name">
    <div className="hero-content">
      <div className="portrait-round"><Image src="/images/mehmet-boz-460.webp" alt="" width={230} height={230} priority unoptimized /></div>
      <h1 id="hero-name" className="sr-only">Mehmet Boz</h1>
      <NameMark />
      <p className="hero-role">AI Software Engineer</p>
      <p className="hero-intro">{nl ? "Ik ontwerp en bouw AI-applicaties en AI-agents," : "I design and build AI applications and agents,"}{" "}<br />{nl ? "van het eerste idee tot productie." : "from the first idea to production."}</p>
      <div className="hero-actions"><a className="button" href="#work">{nl ? "Bekijk mijn werk" : "See my work"}<ArrowDown size={20} /></a><a className="text-link" href="#contact">{nl ? "Neem contact op" : "Get in touch"}<ArrowUpRight size={20} /></a></div>
    </div>
    <div className="hero-dome" aria-hidden="true" />
    <HeroArc />
  </section>;
}
