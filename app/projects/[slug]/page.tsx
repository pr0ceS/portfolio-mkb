import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { Navigation } from "@/app/components/nav";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      <div className="fixed top-0 w-full z-50">
         <Navigation />
      </div>
      
      <Header project={project} views={0} />
      
      {/* 
          FIXED LAYOUT:
          1. Added 'max-w-4xl' to match the other pages' readability width.
          2. Added 'px-6' for mobile padding.
          3. Added 'mx-auto' to center it.
          4. Added 'pb-24' for bottom spacing.
      */}
      <div className="px-6 mx-auto max-w-4xl pb-24">
        <article className="prose prose-zinc prose-quoteless dark:prose-invert prose-lg dark:prose-pre:bg-zinc-900 dark:prose-pre:border-zinc-800 max-w-none">
            <Mdx code={project.body.code} />
        </article>
      </div>
    </div>
  );
}