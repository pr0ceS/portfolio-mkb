"use client";
import { motion } from "framer-motion";

export type TimelineItem = {
  year: string;
  title: string;
  company?: string;
  description: string;
};

export const Timeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-12">
      {/* Vertical Line: Zinc-300 (Light) -> Zinc-700 (Dark) */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 dark:before:via-zinc-700 before:to-transparent">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 group-hover:border-zinc-500 dark:group-hover:border-zinc-500 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
              <div className="w-3 h-3 bg-zinc-400 dark:bg-zinc-500 rounded-full group-hover:bg-zinc-900 dark:group-hover:bg-white transition-colors" />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900/80 transition-all duration-300 shadow-sm dark:shadow-none">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <time className="text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">{item.year}</time>
              </div>
              {item.company && <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 font-medium">{item.company}</div>}
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};