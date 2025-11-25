"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
// @ts-ignore
import { allProjects } from "contentlayer/generated";
import { Navigation } from "@/app/components/nav";
import { Sparkles, ArrowRight } from "lucide-react";
import { useTheme } from "@/app/components/theme-provider";
import { useLanguage } from "@/app/components/language-provider";
import { motion } from "framer-motion";

// Helper to check if it's an AI project for special styling
const isAIProject = (project: any) => {
  const text = (project.title + project.description + project.slug).toLowerCase();
  return text.includes("ai") || text.includes("intelligence") || text.includes("gpt") || text.includes("bot");
};

export default function ProjectsPage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage(); 
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-zinc-50 dark:bg-black min-h-screen" />;

  const sorted = allProjects
    .filter((p: any) => {
        if (!p.published) return false;
        
        // Strict Locale Matching
        // 1. If p.locale is defined, it MUST match the current language.
        // 2. If p.locale is undefined (old projects), assume 'en'.
        const projectLocale = p.locale || 'en';
        return projectLocale === language;
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
      <div className="fixed top-0 w-full z-50">
        <Navigation />
      </div>

      <div className="px-6 pt-32 mx-auto space-y-8 max-w-7xl lg:px-8 md:pt-40 pb-24">
        
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl font-display">
            {t("nav_projects")}
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {language === 'en' 
                ? "A showcase of my technical work, ranging from Autonomous AI Agents to High-Scale E-commerce architectures."
                : "Een overzicht van mijn technisch werk, variërend van Autonome AI Agents tot High-Scale E-commerce architecturen."}
          </p>
        </div>
        
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

        {sorted.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
                {language === 'en' ? "No projects found." : "Geen projecten gevonden in het Nederlands."}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 xl:grid-cols-3">
            {sorted.map((project: any, index: number) => {
                const isAI = isAIProject(project);

                return (
                <motion.div 
                    key={project.slug} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                >
                    {/* AI GLOW EFFECT */}
                    {isAI && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    )}

                    <Link href={`/projects/${project.slug}`} className="block h-full">
                        <article className={`relative h-full p-6 rounded-2xl border bg-white dark:bg-zinc-900 transition-all duration-300 flex flex-col ${
                            isAI 
                            ? "border-transparent dark:bg-black" 
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-none"
                        }`}>
                            
                            {/* Header: Date & AI Badge */}
                            <div className="flex justify-between items-center gap-2 mb-4">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-950">
                                    {project.date ? (
                                        <time dateTime={new Date(project.date).toISOString()}>
                                            {Intl.DateTimeFormat(language === 'nl' ? 'nl-NL' : 'en-US', { dateStyle: "medium" }).format(new Date(project.date))}
                                        </time>
                                    ) : (
                                        <span>SOON</span>
                                    )}
                                </span>
                                
                                {isAI && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full border border-purple-200 dark:border-purple-800 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                                        <Sparkles size={12} /> AI Powered
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h2>
                            
                            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3 flex-grow">
                                {project.description}
                            </p>

                            {/* Tech Stack Badges - Display Logic */}
                            {project.tags && project.tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wide rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center text-sm font-medium text-zinc-900 dark:text-white group-hover:underline">
                                {t("read_more")} <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                        </article>
                    </Link>
                </motion.div>
                );
            })}
            </div>
        )}
      </div>
    </div>
  );
}