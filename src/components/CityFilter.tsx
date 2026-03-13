"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CityFilter({ cities }: { cities: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("city") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value) {
      router.push(`/clubs?city=${encodeURIComponent(value)}`);
    } else {
      router.push("/clubs");
    }
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-lg border border-surface-border bg-white px-4 py-2 text-sm text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
    >
      <option value="">Svi gradovi</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
