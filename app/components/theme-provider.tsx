"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with 'dark' state to prevent hydration mismatch if possible, 
  // though client effect will enforce it immediately.
  const [theme, setTheme] = useState<Theme>("dark");

  // 1. Initialize on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    
    if (stored) {
      // If user has previously visited and chose a theme, respect it
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      // DEFAULT: Always Dark Mode (Ignore System Preference)
      setTheme("dark");
      document.documentElement.classList.add("dark");
      // Optional: Save it so it persists, or leave it to rely on default state
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // 2. The Toggle Function with Circular Reveal Animation
  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // @ts-ignore - View Transitions are new
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return;
    }

    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // Execute the transition
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    });

    // Animate the circle
    await transition.ready;
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: theme === "dark" ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: theme === "dark"
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}