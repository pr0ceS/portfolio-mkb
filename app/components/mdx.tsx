"use client";

import * as React from "react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Mermaid } from "./mermaid";
import Image from "next/image";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}

// --- HELPER: Recursive Text Extraction ---
// This ensures we get the raw string even if the content is wrapped in spans/divs/objects
const extractText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    
    if (Array.isArray(node)) {
        return node.map(extractText).join("");
    }
    
    if (node.props && node.props.children) {
        return extractText(node.props.children);
    }
    
    return "";
};

const components = {
	h1: ({ className, ...props }: any) => (
		<h1 className={clsx("mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />
	),
	h2: ({ className, ...props }: any) => (
		<h2 className={clsx("mt-10 scroll-m-20 border-b border-zinc-200 dark:border-zinc-800 pb-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 first:mt-0", className)} {...props} />
	),
	h3: ({ className, ...props }: any) => (
		<h3 className={clsx("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />
	),
	h4: ({ className, ...props }: any) => (
		<h4 className={clsx("mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />
	),
	h5: ({ className, ...props }: any) => (
		<h5 className={clsx("mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />
	),
	h6: ({ className, ...props }: any) => (
		<h6 className={clsx("mt-8 scroll-m-20 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100", className)} {...props} />
	),
	a: ({ className, ...props }: any) => (
		<Link className={clsx("font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-blue-500 dark:hover:text-blue-400", className)} {...props} />
	),
	p: ({ className, ...props }: any) => (
		<p className={clsx("leading-7 [&:not(:first-child)]:mt-6 text-zinc-700 dark:text-zinc-300", className)} {...props} />
	),
	ul: ({ className, ...props }: any) => (
		<ul className={clsx("my-6 ml-6 list-disc text-zinc-700 dark:text-zinc-300", className)} {...props} />
	),
	ol: ({ className, ...props }: any) => (
		<ol className={clsx("my-6 ml-6 list-decimal text-zinc-700 dark:text-zinc-300", className)} {...props} />
	),
	li: ({ className, ...props }: any) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: any) => (
		<blockquote className={clsx("mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 italic text-zinc-800 dark:text-zinc-200 [&>*]:text-zinc-600 dark:[&>*]:text-zinc-400", className)} {...props} />
	),
	img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img className={clsx("rounded-md border border-zinc-200 dark:border-zinc-800 w-full", className)} alt={alt} {...props} />
	),
	hr: ({ ...props }: any) => (
		<hr className="my-4 border-zinc-200 dark:border-zinc-800 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={clsx("m-0 border-t border-zinc-300 dark:border-zinc-700 p-0 even:bg-zinc-100 dark:even:bg-zinc-900", className)} {...props} />
	),
	th: ({ className, ...props }: any) => (
		<th className={clsx("border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left font-bold text-zinc-900 dark:text-zinc-100 [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props} />
	),
	td: ({ className, ...props }: any) => (
		<td className={clsx("border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props} />
	),

    // --- FIXED PRE HANDLER ---
	pre: ({ className, children, ...props }: any) => {
        // 1. Check 'data-language' on the <pre> itself
        const hasPreData = props["data-language"] === "mermaid";
        
        // 2. Check if any child (specifically the <code> tag) has the class
        const childArray = React.Children.toArray(children);
        const codeElement = childArray[0] as any;
        const hasCodeClass = codeElement?.props?.className?.includes("language-mermaid") || 
                             codeElement?.props?.className?.includes("mermaid");

        if (hasPreData || hasCodeClass) {
            // Extract text using the recursive helper
            const rawCode = extractText(children);
            
            if (rawCode) {
                return <Mermaid chart={rawCode.trim()} />;
            }
        }

        // Standard code block render
		return (
            <pre
                className={clsx(
                    "mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4 border border-zinc-800",
                    className,
                )}
                {...props}
            >
                {children}
            </pre>
        );
    },
	code: ({ className, ...props }: any) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-800 dark:text-zinc-200",
				className,
			)}
			{...props}
		/>
	),
	Image,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}