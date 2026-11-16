"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Coffee, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { usePlayOnView } from "./use-play-on-view";

// Illustrations are drawn with invented data. Screenshots are of the public live sites.
export const hasVideo = (slug: string) => slug === "floorplan-platform" || slug === "aiders";
const screenshots: Record<string, { src: string; host: string; width: number; height: number }> = {
  "freddys-store": { src: "/images/projects/freddys-store.webp", host: "freddys-store.com", width: 1280, height: 764 },
};
export function hasArtwork(slug: string) { return slug in screenshots || slug in clips || slug === "booking-tool" || slug === "crm-data-quality"; }

// Silent looping video for a frame. It plays while it is on screen. Only its first bytes are fetched up front,
// so it can start without a hitch. In a card it is a small cropped file; on the case page (`full`) the whole recording
// with the browser's player. H.264 only: every phone decodes that in hardware.
const clips: Record<string, { card: string; full?: string; wait?: number; en: string; nl: string }> = {
  "floorplan-platform": { card: "floorplan-card", full: "floorplan", en: "Screen recording: the AI furnishes an office room on the floor plan", nl: "Schermopname: de AI richt een kantoorruimte in op de plattegrond" },
  aiders: { card: "aiders-card", wait: 700, en: "Video: introducing Aiders", nl: "Video: introductie van Aiders" },
};
export const hasSound = (slug: string) => slug === "aiders";
function Clip({ slug, nl, full }: { slug: string; nl: boolean; full: boolean }) {
  const clip = clips[slug];
  const file = full && clip.full ? clip.full : clip.card;
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Two videos that start in the same instant cost a few dropped frames, so the second waits a moment.
    let timer = 0;
    const observer = new IntersectionObserver(entries => {
      clearTimeout(timer);
      if (entries.some(entry => entry.isIntersecting)) timer = window.setTimeout(() => video.play().catch(() => {}), clip.wait ?? 0); else video.pause();
    }, { threshold: .35 });
    observer.observe(video);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [clip.wait]);
  return <video ref={ref} className={`clip clip-${slug}`} width={full ? 1600 : slug === "aiders" ? 960 : 828} height={full ? 900 : slug === "aiders" ? 540 : 720} src={`/videos/${file}.mp4`} poster={`/videos/${file}.jpg`} muted loop playsInline preload="metadata" controls={full} aria-label={nl ? clip.nl : clip.en} />;
}

// Small round buttons in the corner of a card's video. They sit outside the card link.
// The play button only shows for visitors who asked for less motion, because the video
// does not start by itself for them.
export function ClipButtons({ nl, sound }: { nl: boolean; sound: boolean }) {
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = (event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.closest(".art-wrap")?.querySelector("video");
  const toggleSound = (event: React.MouseEvent<HTMLButtonElement>) => {
    const v = video(event); if (!v) return;
    v.muted = on; setOn(!on);
    if (!on) { v.play().catch(() => {}); setPlaying(true); }
  };
  const togglePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    const v = video(event); if (!v) return;
    if (playing) v.pause(); else v.play().catch(() => {});
    setPlaying(!playing);
  };
  return <div className="clip-buttons">
    <button type="button" className="clip-button calm-only" onClick={togglePlay} aria-label={nl ? (playing ? "Video pauzeren" : "Video afspelen") : (playing ? "Pause video" : "Play video")}>{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>
    {sound && <button type="button" className="clip-button" onClick={toggleSound} aria-pressed={on} aria-label={nl ? (on ? "Geluid uit" : "Geluid aan") : (on ? "Turn sound off" : "Turn sound on")}>{on ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>}
  </div>;
}

// A video with sound. It waits behind its cover image until the visitor presses play.
function Film({ nl }: { nl: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const start = () => { setStarted(true); ref.current?.play().catch(() => {}); };
  return <div className="film">
    <video ref={ref} className="clip" width={1920} height={1080} src="/videos/aiders.mp4" poster="/videos/aiders.jpg" playsInline preload="none" controls={started} aria-label={nl ? "Video: introductie van Aiders" : "Video: introducing Aiders"} />
    {!started && <button type="button" className="film-play" onClick={start}><span><Play size={20} fill="currentColor" />{nl ? "Bekijk de video" : "Watch the video"}<i>1:39</i></span></button>}
  </div>;
}

// Drawn in the booking tool's own colours (white, near-black and yellow), in both themes.
function BookingArt({ nl }: { nl: boolean }) {
  // A pointer books a room step by step, on a loop. Prices are invented.
  const ref = usePlayOnView<HTMLDivElement>(.5, true);
  const slots: [string, string][] = [["09:00", ""], ["10:00", "taken"], ["11:00", "picked pick-a"], ["12:00", "picked pick-b"], ["13:00", ""], ["14:00", "taken"]];
  return <div className="booking-art" ref={ref}>
    <p className="booking-date">{nl ? "Donderdag 12 maart" : "Thursday 12 March"}</p>
    <p className="booking-room">{nl ? "Vergaderzaal voor 8 personen" : "Meeting room for 8 people"}</p>
    <div className="booking-slots">{slots.map(([time, state]) => <span key={time} className={state || undefined}>{time}</span>)}</div>
    <div className="booking-row"><span className="booking-icon"><Coffee size={18} /></span>{nl ? "Lunch voor 8" : "Lunch for 8"}<span className="booking-check"><Check size={15} strokeWidth={3} /></span></div>
    <div className="booking-total"><span>{nl ? "Totaal incl. btw" : "Total incl. VAT"}</span><strong className="booking-sum"><span>€ 0,00</span><span>€ 60,50</span><span>€ 121,00</span><span>€ 181,50</span></strong></div>
    <div className="booking-button"><span className="booking-go">{nl ? "Boek deze ruimte" : "Book this room"}<ArrowRight size={18} /></span><span className="booking-done"><Check size={18} strokeWidth={3} />{nl ? "Geboekt" : "Booked"}</span></div>
    <div className="booking-pointer"><svg viewBox="0 0 24 24"><path d="M4 2.5v17l4.6-4.3 3 6.6 2.9-1.3-3-6.5h6.3z" fill="#1a1a1a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg></div>
  </div>;
}

// 96 rooms as squares. The marked ones are records the pipeline repaired.
const repaired = [3, 9, 14, 22, 27, 31, 40, 46, 52, 59, 63, 71, 78, 84, 90];
function QualityArt({ nl }: { nl: boolean }) {
  const ref = usePlayOnView<HTMLDivElement>(.6, true);
  return <div className="quality-art" ref={ref}>
    <p className="art-caption">{nl ? "Ruimtes in het CRM, gecontroleerd" : "Rooms in the CRM, checked"}</p>
    <div className="quality-grid">{Array.from({ length: 96 }, (_, i) => { const order = repaired.indexOf(i); return <span key={i} className={order === -1 ? undefined : "mended"} style={order === -1 ? undefined : { "--i": order } as React.CSSProperties} />; })}</div>
    <div className="quality-legend"><span><i />{nl ? "Klopte al" : "Already correct"}</span><span className="mended"><i />{nl ? "Hersteld" : "Repaired"}</span></div>
  </div>;
}

export function ProjectArtwork({ slug, nl, priority = false, controls = false }: { slug: string; nl: boolean; priority?: boolean; controls?: boolean }) {
  if (slug === "aiders" && controls) return <Film nl={nl} />;
  if (slug in clips) return <Clip slug={slug} nl={nl} full={controls} />;
  const shot = screenshots[slug];
  if (shot) return <div className="shot"><div className="shot-bar"><span className="shot-dot" /><span>{shot.host}</span></div><Image src={shot.src} alt="" width={shot.width} height={shot.height} unoptimized priority={priority} /></div>;
  if (slug === "booking-tool") return <BookingArt nl={nl} />;
  if (slug === "crm-data-quality") return <QualityArt nl={nl} />;
  return null;
}
