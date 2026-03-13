import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllClubs, getClubBySlug } from "@/lib/clubs";

export function generateStaticParams() {
  return getAllClubs().map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return {};

  const title = `${club.name} — Obaranje ruku u ${club.city} | armwrestling.rs`;
  const description = club.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://armwrestling.rs/clubs/${club.slug}`,
    },
  };
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = getClubBySlug(slug);

  if (!club) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/clubs"
        className="text-sm text-brand-600 hover:text-brand-700"
      >
        &larr; Svi klubovi
      </Link>

      <div className="mt-6">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
          <span className="mt-1 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
            {club.city}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{club.description}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Adresa</h2>
              <p className="text-gray-900">{club.address}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Raspored treninga
              </h2>
              <p className="text-gray-900">{club.trainingSchedule}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">Kontakt</h2>
              <ul className="space-y-1">
                {club.contact.phone && (
                  <li>
                    <a
                      href={`tel:${club.contact.phone}`}
                      className="text-brand-600 hover:text-brand-700"
                    >
                      {club.contact.phone}
                    </a>
                  </li>
                )}
                {club.contact.email && (
                  <li>
                    <a
                      href={`mailto:${club.contact.email}`}
                      className="text-brand-600 hover:text-brand-700"
                    >
                      {club.contact.email}
                    </a>
                  </li>
                )}
                {club.contact.instagram && (
                  <li>
                    <span className="text-gray-900">
                      Instagram: {club.contact.instagram}
                    </span>
                  </li>
                )}
                {club.contact.facebook && (
                  <li>
                    <span className="text-gray-900">
                      Facebook: {club.contact.facebook}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border border-surface-border">
            <iframe
              title={`Mapa — ${club.name}`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${club.lng - 0.01}%2C${club.lat - 0.01}%2C${club.lng + 0.01}%2C${club.lat + 0.01}&layer=mapnik&marker=${club.lat}%2C${club.lng}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
