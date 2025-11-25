"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "./theme-provider";

export const Mermaid = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    // 1. Initialize
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "var(--font-inter)",
    });

    const renderChart = async () => {
      // 2. Extract code from the hidden source div
      // innerText preserves spaces and newlines that React props might mess up
      if (!sourceRef.current) return;
      const rawCode = sourceRef.current.innerText;

      if (!rawCode) return;

      try {
        // 3. Generate a unique ID for this chart
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // 4. Ask Mermaid to render the SVG
        const { svg } = await mermaid.render(id, rawCode);
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid rendering failed:", error);
        // If it fails, showing the raw code is better than nothing
        setSvg(""); 
      }
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(renderChart, 100);
    return () => clearTimeout(timeout);

  }, [children, theme]);

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full">
        {/* 
           The Container for the SVG 
           We use suppressHydrationWarning to stop React from complaining 
           about the HTML changing
        */}
        <div 
            ref={containerRef}
            className="w-full overflow-x-auto flex justify-center p-4 bg-white/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: svg }}
        />

        {/* 
           Hidden Source: We render the original code here but hide it.
           We read the text from this element to get perfect spacing.
        */}
        <div ref={sourceRef} style={{ display: "none" }}>
            {children}
        </div>
    </div>
  );
};