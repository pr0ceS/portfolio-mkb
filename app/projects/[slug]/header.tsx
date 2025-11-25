"use client";
import Link from "next/link";
import React from "react";
import { Github, Globe } from "lucide-react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};
	views: number;
};

export const Header: React.FC<Props> = ({ project }) => {
	
	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
            icon: <Github size={20} />
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
            icon: <Globe size={20} />
		});
	}

	return (
		<header
			className="relative mb-14 isolate overflow-hidden bg-gradient-to-tl from-zinc-50 via-zinc-200/50 to-zinc-50 dark:from-black dark:via-zinc-900 dark:to-black transition-colors duration-500 border-b border-zinc-200 dark:border-zinc-800"
		>
            {/* BACKGROUND PARTICLES OR GRID COULD GO HERE */}
            
			<div className="container mx-auto relative isolate overflow-hidden pt-48 pb-24 px-6">
				<div className="mx-auto max-w-4xl text-center flex flex-col items-center">
					
                    {/* Title & Desc */}
                    <div className="mx-auto max-w-3xl lg:mx-0">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white font-display mb-6">
							{project.title}
						</h1>
						<p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-300">
							{project.description}
						</p>
					</div>

                    {/* Action Buttons */}
					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="flex flex-wrap justify-center gap-4">
							{links.map((link) => (
								<Link 
                                    target="_blank" 
                                    key={link.label} 
                                    href={link.href} 
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 hover:scale-105 transition-all font-medium shadow-sm"
                                >
                                    {link.icon}
									{link.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};