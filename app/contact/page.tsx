"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { motion } from "framer-motion";

const socials = [
	{
		icon: <Mail size={28} />,
		href: "mailto:mkboz889@gmail.com",
		label: "Email",
		handle: "mkboz889@gmail.com",
	},
	{
		icon: <Linkedin size={28} />,
		href: "https://www.linkedin.com/in/mehmet-boz-135a29359/",
		label: "LinkedIn",
		handle: "Mehmet Boz",
	},
	{
		icon: <Github size={28} />,
		href: "https://github.com/pr0ceS",
		label: "Github",
		handle: "pr0ceS",
	},
];

export default function Contact() {
	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
            
            {/* Navigation */}
            <div className="fixed top-0 w-full z-50">
                <Navigation />
            </div>

			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto pt-24 pb-12">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-3 lg:gap-16 max-w-5xl">
					{socials.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <Link
                                href={s.href}
                                target="_blank"
                                className="flex flex-col items-center gap-6 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300 group shadow-sm hover:shadow-md"
                            >
                                <span 
                                    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300"
                                >
                                    {s.icon}
                                </span>
                                
                                <div className="flex flex-col items-center">
                                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {s.handle}
                                    </span>
                                    <span className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
                                        {s.label}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
					))}
				</div>
			</div>
		</div>
	);
}