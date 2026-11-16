"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useLanguage } from "./language-provider";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const label = language === "nl" ? `Schakel naar ${theme === "dark" ? "lichte" : "donkere"} modus` : `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  return <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={label}><Sun className="theme-sun" size={20} /><Moon className="theme-moon" size={20} /></button>;
}
