"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200 text-zinc-800 dark:text-zinc-200"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={{ scale: 0.5, rotate: 0 }}
          animate={{ 
            scale: theme === "dark" ? 1 : 0, 
            rotate: theme === "dark" ? 0 : 90,
            opacity: theme === "dark" ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, rotate: 90 }}
          animate={{ 
            scale: theme === "light" ? 1 : 0, 
            rotate: theme === "light" ? 0 : 90,
            opacity: theme === "light" ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6" />
        </motion.div>
      </div>
    </button>
  );
}