import { Club } from "@/types";
import fs from "fs";
import path from "path";

const clubsPath = path.join(process.cwd(), "content/clubs.json");

export function getAllClubs(): Club[] {
  const data = fs.readFileSync(clubsPath, "utf8");
  return JSON.parse(data) as Club[];
}

export function getClubBySlug(slug: string): Club | undefined {
  return getAllClubs().find((club) => club.slug === slug);
}

export function getCities(): string[] {
  const cities = getAllClubs().map((club) => club.city);
  return [...new Set(cities)].sort();
}
