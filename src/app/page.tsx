import Image from "next/image";
import Link from "next/link";
import ClubCard from "@/components/ClubCard";
import GuideCard from "@/components/GuideCard";
import { getAllClubs } from "@/lib/clubs";
import { getAllGuides } from "@/lib/guides";

export default function Home() {
  const clubs = getAllClubs().slice(0, 3);
  const guides = getAllGuides().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center">
        <Image
          src="/images/hero-bg.png"
          alt="Arm wrestling match"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h1
            className="max-w-lg text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            Obaranje ruku u Srbiji
          </h1>
          <p
            className="mt-4 max-w-md text-lg text-gray-200"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Pronađi klub, prati turnire i započni svoju priču u armwrestlingu.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/clubs"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-colors hover:bg-gray-100"
            >
              Pronađi klub
            </Link>
            <Link
              href="/events"
              className="rounded-lg border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Predstojeći turniri
            </Link>
          </div>
        </div>
      </section>

      {/* Featured clubs */}
      <section className="bg-surface-muted py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Klubovi širom Srbije
          </h2>
          <p className="mt-1 text-gray-500">
            Pronađi klub u svom gradu i kreni na prvi trening.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard key={club.slug} club={club} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/clubs"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Pogledaj sve klubove &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest guides */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Vodiči za početnike
          </h2>
          <p className="mt-1 text-gray-500">
            Sve što treba da znate pre prvog treninga.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/guides"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Svi vodiči &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
