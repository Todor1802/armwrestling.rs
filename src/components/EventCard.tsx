import Link from "next/link";
import { ArmEvent } from "@/types";

export default function EventCard({ event }: { event: ArmEvent }) {
  const date = new Date(event.date);
  const isPast = date < new Date();

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div
        className={`rounded-xl border border-surface-border bg-white p-6 transition-shadow hover:shadow-md ${
          isPast ? "opacity-60" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600">
            {event.name}
          </h3>
          <time
            dateTime={event.date}
            className="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700"
          >
            {date.toLocaleDateString("sr-Latn-RS", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {event.city} &middot; {event.venue}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.categories.map((cat) => (
            <span
              key={cat}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
