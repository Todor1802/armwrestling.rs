import { ArmEvent } from "@/types";
import fs from "fs";
import path from "path";

const eventsPath = path.join(process.cwd(), "content/events.json");

export function getAllEvents(): ArmEvent[] {
  const data = fs.readFileSync(eventsPath, "utf8");
  return (JSON.parse(data) as ArmEvent[]).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getUpcomingEvents(): ArmEvent[] {
  const now = new Date();
  return getAllEvents().filter((event) => new Date(event.date) >= now);
}

export function getPastEvents(): ArmEvent[] {
  const now = new Date();
  return getAllEvents().filter((event) => new Date(event.date) < now);
}

export function getEventBySlug(slug: string): ArmEvent | undefined {
  return getAllEvents().find((event) => event.slug === slug);
}
