import Link from "next/link";
import { Club } from "@/types";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.slug}`} className="group block">
      <div className="rounded-xl border border-surface-border bg-white p-6 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600">
            {club.name}
          </h3>
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            {club.city}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{club.trainingSchedule}</p>
        <p className="mt-3 line-clamp-2 text-sm text-gray-600">
          {club.description}
        </p>
      </div>
    </Link>
  );
}
