"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "./theme-provider";

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    if (chart) {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-inter)",
        });

        const renderChart = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error("Mermaid rendering failed:", error);
            }
        };
        
        renderChart();
      } catch (e) {
        console.error("Mermaid init error:", e);
      }
    }
  }, [chart, theme]);

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full">
        <div 
            className="w-full overflow-x-auto flex justify-center p-4 bg-white/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    </div>
  );
};