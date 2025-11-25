"use client";
import { Navigation } from "./nav";
import { useLanguage } from "./language-provider";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Timeline, TimelineItem } from "./timeline";
import { motion } from "framer-motion";

interface InfoPageProps {
  title: string;
  description: string;
  content: React.ReactNode;
  timelineItems?: TimelineItem[];
}

export const InfoPageLayout: React.FC<InfoPageProps> = ({ title, description, content, timelineItems }) => {
  const { t } = useLanguage();

  return (
    // FIXED: Dynamic background color
    <div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500 relative overflow-hidden">
      
      {/* FIXED: Navigation Container z-index */}
      <div className="fixed top-0 w-full z-50">
         <Navigation />
      </div>
      
      <div className="px-6 pt-32 mx-auto space-y-8 max-w-7xl lg:px-8 md:pt-40 relative z-10 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto lg:mx-0"
        >
          {/* FIXED: Text colors */}
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl font-display">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </motion.div>

        {/* FIXED: Divider color */}
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Main Text Content */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           // FIXED: Prose colors for rich text
           className="prose prose-zinc prose-quoteless dark:prose-invert max-w-none md:prose-lg"
        >
            {content}
        </motion.div>

        {/* Timeline (Optional) */}
        {timelineItems && (
            <>
                <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 mt-16 mb-8" />
                <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8 font-display">Experience</h2>
                <Timeline items={timelineItems} />
            </>
        )}

        {/* Call To Action */}
        <div className="py-24 flex justify-center">
            <Link href="/contact">
                {/* FIXED: Button colors */}
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg transition-transform hover:scale-105 hover:shadow-xl">
                    <span>{t("cta_contact_me")}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};