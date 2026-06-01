import MainLayout from "@/components/layout/MainLayout";

import {
  getTutorialBySlug,
} from "@/lib/tutorials";

export default async function TutorialPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  // FIX FOR NEXT 16
  const { slug } = await params;

  // Get Tutorial
  const tutorial =
    getTutorialBySlug(slug);

  return (
    <MainLayout>

      <article className="min-h-screen bg-black text-white py-24 px-4 sm:px-6">

        <div className="max-w-4xl mx-auto">

          {/* Badge */}
          <p className="text-green-500 uppercase tracking-[0.2em] text-sm font-bold mb-6">

            Tutorial

          </p>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">

            {
              tutorial.frontmatter
                .title
            }

          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-xl mt-8 leading-relaxed">

            {
              tutorial.frontmatter
                .description
            }

          </p>

          {/* Divider */}
          <div className="h-px bg-zinc-800 my-16" />

          {/* Content */}
          <div className="whitespace-pre-wrap leading-8 text-zinc-300">

            {tutorial.content}

          </div>

        </div>

      </article>

    </MainLayout>
  );
}