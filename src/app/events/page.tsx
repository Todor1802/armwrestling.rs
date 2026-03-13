import type { Metadata } from "next";
import Link from "next/link";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Turniri u obaranju ruku | armwrestling.rs",
  description:
    "Predstojeći i prošli turniri u obaranju ruku u Srbiji. Prijavi se i takmič se.",
  openGraph: {
    title: "Turniri u obaranju ruku | armwrestling.rs",
    description:
      "Predstojeći i prošli turniri u obaranju ruku u Srbiji. Prijavi se i takmič se.",
    url: "https://armwrestling.rs/events",
  },
};
import { getUpcomingEvents, getPastEvents } from "@/lib/events";

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900">Turniri</h1>
      <p className="mt-1 text-gray-500">
        Predstojeći i prošli turniri u obaranju ruku.
      </p>

      {/* Upcoming */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Predstojeći turniri
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-gray-500">
            Trenutno nema zakazanih turnira.
          </p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-400">
            Prošli turniri
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      )}

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
