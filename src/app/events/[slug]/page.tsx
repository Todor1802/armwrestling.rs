import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/events";

export function generateStaticParams() {
  return getAllEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  const title = `${event.name} | armwrestling.rs`;
  const description = event.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://armwrestling.rs/events/${event.slug}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) return notFound();

  const date = new Date(event.date);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/events"
        className="text-sm text-brand-600 hover:text-brand-700"
      >
        &larr; Svi turniri
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900">Datum:</span>
            <time dateTime={event.date}>
              {date.toLocaleDateString("sr-Latn-RS", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900">Grad:</span>
            {event.city}
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-500">Mesto</h2>
              <p className="text-gray-900">{event.venue}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Organizator
              </h2>
              <p className="text-gray-900">{event.organizer}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500">
                Kategorije
              </h2>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {event.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-brand-50 px-2.5 py-0.5 text-sm font-medium text-brand-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {event.registrationUrl && (
              <div>
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Prijavi se
                </a>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Opis</h2>
            <p className="mt-1 text-gray-700">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
