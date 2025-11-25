import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",

	fields: {
		published: { type: "boolean" },
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		date: { type: "date" },
		url: { type: "string" },
		repository: { type: "string" },
		tags: {
			type: "list",
			of: { type: "string" },
            required: false, 
		},
		locale: {
			type: "string", 
            default: "en",
            required: false,
		},
	},
	computedFields,
}));

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		description: { type: "string" },
	},
	computedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Page, Project],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
                    // --- FIX: Do not process mermaid blocks ---
                    filter: (node) => {
                        // Check if the node is a code block with language-mermaid
                        const isMermaid = node.children?.[0]?.properties?.className?.includes("language-mermaid");
                        return !isMermaid;
                    },
                    // ------------------------------------------
					onVisitLine(node) {
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});