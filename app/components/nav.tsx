"use client";

import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added 'Variants' type
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/about", key: "nav_about" },
  { href: "/ecommerce", key: "nav_ecommerce" },
  { href: "/programming", key: "nav_programming" },
  { href: "/projects", key: "nav_projects" },
  { href: "/contact", key: "nav_contact" },
];

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // --- SMART BACK LOGIC ---
  const getBackPath = () => {
    if (pathname?.startsWith("/projects/") && pathname !== "/projects") {
        return "/projects";
    }
    return "/";
  };

  const backPath = getBackPath();

  // --- ANIMATIONS (Fixed Types) ---
  
  // FIX: Added ': Variants' type annotation
  const menuVariants: Variants = {
    initial: { y: "-100%", opacity: 0 },
    animate: { 
        y: "0%", 
        opacity: 1, 
        transition: { 
            duration: 0.5, 
            // FIX: Added 'as const' to satisfy Tuple type requirement
            ease: [0.76, 0, 0.24, 1] as const 
        } 
    },
    exit: { 
        y: "-100%", 
        opacity: 0, 
        transition: { 
            duration: 0.5, 
            // FIX: Added 'as const'
            ease: [0.76, 0, 0.24, 1] as const 
        } 
    },
  };

  const containerVariants: Variants = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    animate: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
  };

  const linkVariants: Variants = {
    initial: { 
        y: 30, 
        opacity: 0, 
        transition: { 
            duration: 0.5, 
            // FIX: Added 'as const'
            ease: [0.37, 0, 0.63, 1] as const 
        } 
    },
    animate: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            duration: 0.7, 
            // FIX: Added 'as const'
            ease: [0, 0.55, 0.45, 1] as const 
        } 
    },
    exit: { 
        y: 30, 
        opacity: 0, 
        transition: { 
            duration: 0.4, 
            // FIX: Added 'as const'
            ease: [0.37, 0, 0.63, 1] as const 
        } 
    },
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 duration-200 border-b transition-all ${
          isIntersecting && !isOpen
            ? "bg-transparent border-transparent"
            : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 backdrop-blur-xl"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto relative z-50">
          
          <div className="flex items-center gap-4 z-50">
             <ThemeToggle />
             
             {pathname !== "/" && (
                <Link 
                    href={backPath} 
                    className="duration-200 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-zinc-100" 
                    onClick={handleLinkClick}
                    aria-label="Go Back"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Link>
             )}
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.key} href={link.href} className="text-sm duration-200 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-100 font-medium">
                {t(link.key)}
              </Link>
            ))}
            <div className="flex gap-2 text-xs border-l border-zinc-300 dark:border-zinc-700 pl-4 ml-2">
               <button onClick={() => setLanguage("en")} className={`${language === "en" ? "text-black dark:text-white font-bold" : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"}`}>EN</button>
               <span className="text-zinc-300 dark:text-zinc-700">/</span>
               <button onClick={() => setLanguage("nl")} className={`${language === "nl" ? "text-black dark:text-white font-bold" : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"}`}>NL</button>
            </div>
          </div>

          <div className="flex md:hidden z-50 relative">
             <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-800 dark:text-zinc-100 focus:outline-none" aria-label="Toggle menu">
                <div className="relative w-6 h-6">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute inset-0"><X className="w-6 h-6" /></motion.div>
                        ) : (
                            <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }} className="absolute inset-0"><Menu className="w-6 h-6" /></motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div key="mobile-overlay" variants={menuVariants} initial="initial" animate="animate" exit="exit" className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center md:hidden h-screen overflow-hidden">
              <motion.div className="flex flex-col items-center gap-8" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                {links.map((link) => (
                  <motion.div key={link.key} variants={linkVariants} className="overflow-hidden">
                    <Link href={link.href} onClick={handleLinkClick} className="block text-4xl font-display font-bold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
                 <motion.div className="flex gap-6 text-sm mt-8" variants={linkVariants}>
                   <button onClick={() => setLanguage("en")} className={`text-lg ${language === "en" ? "text-black dark:text-white font-bold border-b-2 border-black dark:border-white" : "text-zinc-400 dark:text-zinc-500"}`}>English</button>
                   <button onClick={() => setLanguage("nl")} className={`text-lg ${language === "nl" ? "text-black dark:text-white font-bold border-b-2 border-black dark:border-white" : "text-zinc-400 dark:text-zinc-500"}`}>Nederlands</button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};