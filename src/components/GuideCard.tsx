import Link from "next/link";
import { Guide } from "@/types";

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <div className="rounded-xl border border-surface-border bg-white p-6 transition-shadow hover:shadow-md">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {guide.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-xs text-gray-400">
            {new Date(guide.publishedAt).toLocaleDateString("sr-Latn-RS", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
