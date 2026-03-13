import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let guide;
  try {
    guide = getGuideBySlug(slug);
  } catch {
    return {};
  }

  const title = `${guide.meta.title} | armwrestling.rs`;
  const description = guide.meta.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://armwrestling.rs/guides/${slug}`,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let guide;
  try {
    guide = getGuideBySlug(slug);
  } catch {
    return notFound();
  }

  const { meta, content } = guide;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/guides"
        className="text-sm text-brand-600 hover:text-brand-700"
      >
        &larr; Svi vodiči
      </Link>

      <article className="mt-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">{meta.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
              >
                {tag}
              </span>
            ))}
            <span className="text-sm text-gray-400">
              {new Date(meta.publishedAt).toLocaleDateString("sr-Latn-RS", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="prose prose-gray mt-8 max-w-none prose-headings:text-gray-900 prose-a:text-brand-600 hover:prose-a:text-brand-700">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
