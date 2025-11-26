"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "./components/language-provider";
import { useTheme } from "./components/theme-provider";
import { motion } from "framer-motion";
import { Navigation } from "./components/nav";
import { ArrowRight, Github, Linkedin, Mail, Phone, ShoppingBag, Terminal, FolderKanban, User, CheckCircle2 } from "lucide-react";
import { Timeline } from "./components/timeline";

const contactDetails = {
  email: "mkboz889@gmail.com",
  phone: "+31 6 23356676",
  linkedin: "https://www.linkedin.com/in/mehmet-boz-135a29359/",
  github: "https://github.com/pr0ceS",
};

export default function Home() {
  const { language, setLanguage, t, lookingFor, experience, softSkills } = useLanguage();
  const { theme } = useTheme();
  const [shouldAnimate, setShouldAnimate] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro-shown");
    if (hasSeenIntro) {
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
      sessionStorage.setItem("intro-shown", "true");
    }
  }, []);

  if (shouldAnimate === null) return <div className="bg-zinc-50 dark:bg-black min-h-screen w-screen" />;

  // Animation Timing
  const LINE_DURATION = shouldAnimate ? 0.4 : 0;
  const SEPARATION_DURATION = shouldAnimate ? 0.4 : 0;
  const TEXT_REVEAL_DELAY = shouldAnimate ? 0.6 : 0; 
  const FADE_IN_DELAY = shouldAnimate ? 2.2 : 0; 

  const targetColor = theme === "dark" ? "#ffffff" : "#18181b"; 
  const outlineColor = theme === "dark" ? "rgba(255,255,255,0)" : "rgba(0,0,0,0)";

  return (
    <div className="flex flex-col items-center w-screen min-h-screen overflow-x-hidden bg-gradient-to-tl from-zinc-50 via-zinc-200/50 to-zinc-50 dark:from-black dark:via-zinc-600/20 dark:to-black transition-colors duration-500">
      
      {/* NAVIGATION: Fades in LATE */}
      <motion.div 
        className="w-full z-50"
        initial={{ opacity: shouldAnimate ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: FADE_IN_DELAY, duration: 1 }}
      >
        <Navigation />
      </motion.div>

      {/* Top Glow Line */}
      <motion.div 
        className="hidden w-screen h-px bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0"
        initial={{ opacity: shouldAnimate ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: FADE_IN_DELAY, duration: 1 }}
      />

      {/* --- HERO SECTION (Intro Stage) --- */}
      <div className="flex flex-col items-center justify-center w-full relative z-10 pt-28 pb-12 px-4 min-h-[60vh]">
        
        {/* Profile Picture */}
        <motion.div 
          className="relative w-40 h-40 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-500/50 shadow-xl bg-white dark:bg-zinc-900"
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: FADE_IN_DELAY, duration: 0.8 }}
        >
            <Image 
                src="/me.jpeg" 
                alt="Mehmet Boz"
                fill
                className="object-cover"
                priority
            />
        </motion.div>

        {/* INTRO ANIMATION */}
        <div className="relative flex items-center justify-center w-full py-6">
            {shouldAnimate && (
                <motion.div 
                    className="absolute h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent dark:via-zinc-300/50"
                    initial={{ width: "0%", top: "50%", opacity: 1 }}
                    animate={{ width: "100%", top: "0%", opacity: 0 }}
                    transition={{ width: { duration: LINE_DURATION, ease: "easeInOut" }, top: { delay: LINE_DURATION, duration: SEPARATION_DURATION, ease: "easeInOut" }, opacity: { delay: 1.5, duration: 0.5 } }}
                    style={{ left: "50%", translateX: "-50%" }}
                />
            )}

            <motion.h1 
                className="px-0.5 z-10 text-6xl md:text-8xl font-display whitespace-nowrap text-edge-outline cursor-default text-zinc-900 dark:text-white"
                initial={{ 
                    opacity: shouldAnimate ? 0 : 1, 
                    color: shouldAnimate ? outlineColor : targetColor
                }}
                animate={{ 
                    opacity: 1, 
                    color: targetColor 
                }}
                transition={{ 
                    opacity: { delay: TEXT_REVEAL_DELAY, duration: 0.1 },
                    color: { delay: TEXT_REVEAL_DELAY + 0.2, duration: 0.8, ease: "easeInOut" } 
                }}
            >
                Mehmet Boz
            </motion.h1>

            {shouldAnimate && (
                <motion.div 
                    className="absolute h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent dark:via-zinc-300/50"
                    initial={{ width: "0%", top: "50%", opacity: 1 }}
                    animate={{ width: "100%", top: "100%", opacity: 0 }}
                    transition={{ width: { duration: LINE_DURATION, ease: "easeInOut" }, top: { delay: LINE_DURATION, duration: SEPARATION_DURATION, ease: "easeInOut" }, opacity: { delay: 1.5, duration: 0.5 } }}
                    style={{ left: "50%", translateX: "-50%" }}
                />
            )}
        </div>

        {/* Subtitle */}
        <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: shouldAnimate ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: FADE_IN_DELAY, duration: 1 }}
        >
            <h2 className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mx-auto max-w-2xl px-4 font-medium leading-relaxed">
                {t("hero_subtitle")}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4 mx-auto max-w-xl">
                {t("hero_subtitle_2")}
            </p>
        </motion.div>

        {/* Socials */}
        <motion.div 
             className="flex gap-4 mt-8"
             initial={{ opacity: shouldAnimate ? 0 : 1, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: FADE_IN_DELAY + 0.2, duration: 0.8 }}
        >
             <Link href={contactDetails.linkedin} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><Linkedin size={24}/></Link>
             <Link href={contactDetails.github} target="_blank" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><Github size={24}/></Link>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div 
         className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent dark:via-zinc-700/50" 
         initial={{ opacity: shouldAnimate ? 0 : 1 }}
         animate={{ opacity: 1 }}
         transition={{ delay: FADE_IN_DELAY + 0.3, duration: 1 }}
      />

      {/* --- FADE IN CONTENT WRAPPER --- */}
      <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: shouldAnimate ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: FADE_IN_DELAY + 0.5, duration: 1 }}
      >

          {/* 1. LOOKING FOR */}
          <div className="w-full max-w-5xl px-6 py-16">
            <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-10 font-display">
                {t("section_looking_for")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {lookingFor.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col items-center text-center gap-3 shadow-sm">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.title}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* 2. MAIN CONTENT HUBS (About + 3 Cards) - MOVED UP */}
          <div className="w-full max-w-6xl px-6 pb-16 space-y-12">
              
              {/* ABOUT ME Card */}
              <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="text-blue-500" />
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white font-display">{t("section_about")}</h3>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            {t("teaser_about_desc")}
                        </p>
                        
                        {/* Embedded Contact */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                             <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-300 hover:underline">
                                <Mail size={16} /> {contactDetails.email}
                             </a>
                             <a href={`tel:${contactDetails.phone}`} className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-300 hover:underline">
                                <Phone size={16} /> {contactDetails.phone}
                             </a>
                        </div>

                        <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:opacity-70 border-b border-zinc-900 dark:border-white pb-0.5">
                            {t("read_more")} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
              </div>

              {/* Grid for Ecom / Prog / Proj */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* E-COMMERCE */}
                  <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                     <div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                            <ShoppingBag size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-3">{t("teaser_ecommerce_title")}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t("teaser_ecommerce_desc")}</p>
                     </div>
                     <Link href="/ecommerce" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:opacity-70">
                        {t("read_more")} <ArrowRight size={14} />
                     </Link>
                  </div>

                  {/* PROGRAMMING */}
                  <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                     <div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <Terminal size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-3">{t("teaser_programming_title")}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t("teaser_programming_desc")}</p>
                     </div>
                     <Link href="/programming" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:opacity-70">
                        {t("read_more")} <ArrowRight size={14} />
                     </Link>
                  </div>

                  {/* PROJECTS */}
                  <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm flex flex-col justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm">
                     <div>
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                            <FolderKanban size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-3">{t("teaser_projects_title")}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t("teaser_projects_desc")}</p>
                     </div>
                     <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:opacity-70">
                        {t("read_more")} <ArrowRight size={14} />
                     </Link>
                  </div>
              </div>

              {/* --- NEW PROJECTS BUTTON (Outside of grid) --- */}
              <div className="flex justify-center pt-8">
                  <Link 
                    href="/projects" 
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg"
                  >
                      <span>{language === 'en' ? "See Projects" : "Projecten Bekijken"}</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
              </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent dark:via-zinc-700/50 mb-12" />

          {/* 3. TIMELINE SECTION (MOVED DOWN) */}
          <div className="w-full max-w-5xl px-6 pb-16">
              <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2 font-display">
                 {t("section_experience")}
              </h3>
              <Timeline items={experience} />
          </div>

          {/* 4. SOFT SKILLS (MOVED DOWN) */}
          <div className="w-full max-w-5xl px-6 pb-20">
              <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-10 font-display">
                 {t("section_skills_soft")}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                  {softSkills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm transition-transform hover:scale-105 cursor-default">
                          <CheckCircle2 size={18} className="text-green-500" />
                          <span className="font-medium">{skill}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* --- FOOTER CONTACT --- */}
          <div className="w-full bg-zinc-100 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-20 text-center">
              <div className="max-w-2xl mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white font-display mb-6">
                      {t("contact_footer_text")}
                  </h2>
                  <div className="flex justify-center gap-4 flex-wrap">
                      <Link 
                        href="/contact" 
                        className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform"
                      >
                          {t("cta_contact_me")}
                      </Link>
                  </div>
              </div>
          </div>

      </motion.div>

    </div>
  );
}