"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "./theme-provider";

interface MermaidProps {
  chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (chart && typeof window !== 'undefined') {
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
                setError(false);
            } catch (err) {
                console.error("Mermaid rendering failed:", err);
                setError(true);
            }
        };
        
        // Small timeout to ensure DOM is ready and prevent race conditions
        setTimeout(renderChart, 0);
      } catch (e) {
        console.error("Mermaid init error:", e);
        setError(true);
      }
    }
  }, [chart, theme]);

  if (error) {
      // Fallback to showing code block if render fails
      return (
        <pre className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg overflow-x-auto text-sm">
            <code>{chart}</code>
        </pre>
      );
  }

  if (!svg) {
       // Loading state
       return <div className="h-24 w-full animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl" />;
  }

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