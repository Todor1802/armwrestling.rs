import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Klubovi za obaranje ruku u Srbiji | armwrestling.rs",
  description:
    "Pronađi klub za obaranje ruku u svom gradu — Beograd, Novi Sad, Niš, Kragujevac i drugi gradovi.",
  openGraph: {
    title: "Klubovi za obaranje ruku u Srbiji | armwrestling.rs",
    description:
      "Pronađi klub za obaranje ruku u svom gradu — Beograd, Novi Sad, Niš, Kragujevac i drugi gradovi.",
    url: "https://armwrestling.rs/clubs",
  },
};
import ClubCard from "@/components/ClubCard";
import CityFilter from "@/components/CityFilter";
import { getAllClubs, getCities } from "@/lib/clubs";

function ClubList({ city }: { city?: string }) {
  const allClubs = getAllClubs();
  const clubs = city
    ? allClubs.filter((club) => club.city === city)
    : allClubs;

  if (clubs.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        Nema klubova u izabranom gradu.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <ClubCard key={club.slug} club={club} />
      ))}
    </div>
  );
}

export default async function ClubsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const cities = getCities();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Klubovi</h1>
          <p className="mt-1 text-gray-500">
            Pronađi klub za obaranje ruku u svom gradu.
          </p>
        </div>
        <Suspense>
          <CityFilter cities={cities} />
        </Suspense>
      </div>

      <div className="mt-8">
        <ClubList city={city} />
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
