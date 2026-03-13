import { ArmEvent } from "@/types";

export default function EventCard({ event }: { event: ArmEvent }) {
  return <div>{event.name}</div>;
}
