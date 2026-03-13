import type { Metadata } from "next";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";

export const metadata: Metadata = {
  title: "Vodiči za obaranje ruku | armwrestling.rs",
  description:
    "Praktični vodiči za početnike — tehnika, prevencija povreda i priprema za prvi trening.",
  openGraph: {
    title: "Vodiči za obaranje ruku | armwrestling.rs",
    description:
      "Praktični vodiči za početnike — tehnika, prevencija povreda i priprema za prvi trening.",
    url: "https://armwrestling.rs/guides",
  },
};
import { getAllGuides } from "@/lib/guides";

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">Vodiči</h1>
      <p className="mt-1 text-gray-500">
        Praktični vodiči za sve koji žele da počnu sa obaranjem ruku.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-brand-600 hover:text-brand-700"
        >
          &larr; Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
